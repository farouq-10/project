//userController.js
import * as userService from "../services/user.services.js";
import { supabase } from '../DB/connectionDb.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

import { signupSchema, oauthUserSchema, validateData } from '../validators/user.validators.js';
import axios from 'axios';
import { logUserActivity } from "../utils/activityLogger.js"; 


// تسجيل مستخدم جديد
export const signUp = async (req, res) => {
  const { firstName, secondName, email, phone, password } = req.body;

  try {
    // 1. Validate input data
    const { isValid, errors } = await validateData(signupSchema, req.body);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
        errorType: "validation_error"
      });
    }

    // 2. Check for existing email/phone (additional layer)
    const [emailExists, phoneExists] = await Promise.all([
      userService.checkEmailExists(email),
      userService.checkPhoneExists(phone)
    ]);

    if (emailExists || phoneExists) {
      const conflictErrors = {};
      if (emailExists) conflictErrors.email = errorMessages.email.exists;
      if (phoneExists) conflictErrors.phone = errorMessages.phone.exists;
      
      return res.status(409).json({
        success: false,
        message: "Conflict detected",
        errors: conflictErrors,
        errorType: "conflict_error"
      });
    }

    // 3. Create user
    const user = await userService.SignUp({ 
      firstName, 
      secondName, 
      email, 
      phone, 
      password 
    });

    // 4. Log successful registration (without sensitive data)
    await logUserActivity(user.id, 'user_registered', {
      registration_method: 'email'
    });

    // 5. Send response
    res.status(201).json({ 
      success: true,
      message: "Registration successful. Please check your email for verification.",
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        secondName: user.secondName
      },
      meta: {
        verificationRequired: true
      }
    });

  } catch (error) {
    // Log the error with context
    await logUserActivity(null, 'registration_failed', {
      error: error.message,
      email,
      errorType: error.code || 'unknown_error'
    });

    // Determine appropriate status code
    const statusCode = error.code === 'auth/email-already-exists' ? 409 : 400;

    res.status(statusCode).json({ 
      success: false, 
      message: error.message || "Registration failed",
      errorType: error.code || 'registration_error',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};

// تسجيل دخول المستخدم



// تسجيل الدخول التقليدي (بريد + كلمة مرور)
// Traditional login (email + password)
export const handleLogin = async (req, res) => {
  // 1. Validate required data
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
      errorType: "missing_credentials"
    });
  }

  // 2. Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
      errorType: "invalid_email_format"
    });
  }

  // 3. Validate password length
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters",
      errorType: "short_password"
    });
  }

  try {
    // 4. Attempt login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      // 5. Handle login errors
      let errorMessage = "Invalid login credentials";
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Incorrect email or password";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Email not verified, please verify your account first";
      }

      return res.status(401).json({
        success: false,
        message: errorMessage,
        errorType: "login_failed",
        errorDetails: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }

    // 6. Log successful login activity
    await logUserActivity(data.user.id, 'user_login', {
      login_method: 'email_password'
    });

    // 7. Prepare response data (without sensitive info)
    const userData = {
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.name || '',
      avatar: data.user.user_metadata?.avatar || ''
    };

    // 8. Send successful response
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userData,
      session: {
        access_token: data.session.access_token,
        expires_at: data.session.expires_at
      }
    });

  } catch (err) {
    // 9. Handle unexpected errors
    console.error('Login error:', err);
    
    res.status(500).json({
      success: false,
      message: "An error occurred during login",
      errorType: "server_error",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

    
// بدء تسجيل الدخول عبر مزود OAuth (Google, Facebook, LinkedIn, Apple)
export const handleOAuthLogin = async (req, res) => {
  const { provider } = req.params;

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.BACKEND_URL}/auth/callback?provider=${provider}`,
      },
    });

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    res.status(200).json({ success: true, url: data.url }); // frontend هيتعامل مع هذا الرابط
  } catch (err) {
    res.status(500).json({ success: false, message: "OAuth login failed", error: err.message });
  }
};


// Helper to parse user info from Supabase Auth user object
const parseOAuthUser = (user, provider) => ({
  id: user.id,
  email: user.email,
  firstName: user.user_metadata?.name?.split(' ')[0] || 'User',
  secondName: user.user_metadata?.name?.split(' ').slice(1).join(' ') || '',
  phone: user.user_metadata?.phone || '',
  provider: provider.toLowerCase(),
});



export const handleOAuthCallback = async (req, res) => {
  try {
    const { code, provider } = req.query;
    const { user } = req.body;

    // ✅ Case 1: User info comes from frontend
    if (user) {
      console.log('Received user data from client:', user);

      const userExists = await userService.checkEmailExists(user.email);

      if (!userExists) {
        const userInfo = {
          firstName: user.firstName || 'User',
          secondName: user.secondName || '',
          email: user.email,
          phone: user.phone || '',
          provider: user.provider.toLowerCase(),
        };

        const { isValid, errors } = await validateData(oauthUserSchema, userInfo);
        if (!isValid) {
          console.warn('Validation failed:', errors);
        }

        const createdUser = await userService.createOAuthUser(userInfo, userInfo.provider);
        await logUserActivity(createdUser.id, 'user_registered', {
          registration_method: userInfo.provider,
        });

        return res.status(201).json({
          success: true,
          message: `User created successfully via ${userInfo.provider}`,
          user: {
            id: createdUser.id,
            email: createdUser.email,
            firstName: createdUser.firstName,
            secondName: createdUser.secondName,
          },
        });
      }

      // existing user
      const existingUser = await userService.checkEmailExists(user.email);
      if (existingUser) {
        // Log login activity
        await logUserActivity(existingUser.id, 'user_login', {
          login_method: user.provider.toLowerCase(),
        });
      
        return res.status(200).json({
          success: true,
          message: `User logged in via ${user.provider}`,
          user: {
            id: existingUser.id,
            email: existingUser.email,
            firstName: existingUser.firstName,
            secondName: existingUser.secondName,
          },
        });
      }
    }

    // ✅ Case 2: OAuth provider callback
    // if (!code || !provider) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Both code and provider are required',
    //     supported_providers: ['google', 'facebook', 'linkedin', 'apple'],
    //   });
    // }

    // let userData;

    // switch (provider.toLowerCase()) {
    //   case 'linkedin':
    //     userData = await handleLinkedInAuth(code);
    //     break;
    //   case 'apple':
    //     userData = await handleAppleAuth(code);
    //     break;
    //   default:
    //     const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    //     if (error) throw error;
    //     userData = data;
    // }

    const userInfo = parseOAuthUser(userData.user, provider);
    let userRecord = await userService.checkEmailExists(userInfo.email);

    if (!userRecord) {
      const { isValid, errors } = await validateData(oauthUserSchema, userInfo);
      if (!isValid) {
        console.warn('OAuth user validation failed:', errors);
      }

      userRecord = await userService.createOAuthUser(userInfo, provider.toLowerCase());
      await logUserActivity(userRecord.id, 'user_registered', {
        registration_method: provider.toLowerCase(),
      });
    }

    await logUserActivity(userRecord.id, 'user_login', {
      login_method: provider.toLowerCase(),
    });

    return res.status(200).json({
      success: true,
      message: `${provider} authentication successful`,
      user: {
        id: userRecord.id,
        email: userRecord.email,
        name: userRecord.firstName + ' ' + userRecord.secondName,
      },
      access_token: userData.session?.access_token,
      expires_at: userData.session?.expires_at,
    });

  } catch (err) {
    console.error('OAuth Error:', err);

    return res.status(500).json({
      success: false,
      message: 'Authentication failed',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};



async function handleLinkedInAuth(code) {
  // 1. الحصول على Access Token
  const tokenResponse = await axios.post(
    'https://www.linkedin.com/oauth/v2/accessToken',
    new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      redirect_uri: `${process.env.BACKEND_URL}/auth/callback?provider=linkedin`
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  const accessToken = tokenResponse.data.access_token;

  // 2. الحصول على اسم المستخدم
  const profileResponse = await axios.get(
    'https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName)',
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );

  // 3. الحصول على البريد الإلكتروني
  const email = await getLinkedInEmail(accessToken);

  // 4. تسجيل الدخول في Supabase
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'linkedin',
    options: {
      accessToken,
      user: {
        name: `${profileResponse.data.localizedFirstName} ${profileResponse.data.localizedLastName}`,
        email
      }
    }
  });

  if (error) throw error;
  return data;
}

// دالة مساعدة لجلب الإيميل من LinkedIn
async function getLinkedInEmail(accessToken) {
  const response = await axios.get(
    'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );
  return response.data.elements[0]['handle~'].emailAddress;
}

// إرسال رابط إعادة تعيين كلمة المرور

// فقط إذا كنت تستخدم سجل النشاط

// controllers/user.controller.js

// controllers/user.controller.js


export const resetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required." });

  const { data, error } = await resetPasswordService(email);

  if (error) return res.status(400).json({ message: error.message || error });

  return res.status(200).json({ message: "Password reset email sent successfully." });
};

export const changePassword  = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  if (!newPassword || newPassword.length < 8 || !/(?=.*[A-Z])(?=.*[0-9])/.test(newPassword)) {
    return res.status(400).json({
      success: false,
      message: "New password must be at least 8 characters long and contain at least one uppercase letter and one number",
    });
  }

  try {
    const result = await changePassword(userId, currentPassword, newPassword);

    if (!result.success)
      return res.status(401).json({ success: false, message: result.message });

    await logUserActivity(userId, 'password_changed');
    await sendPasswordChangeNotification(req.user.email);

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
      note: "You have been logged out from all other devices",
    });
  } catch (err) {
    console.error('Change password exception:', err);
    return res.status(500).json({
      success: false,
      message: "Internal server error during password change",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};



export const resendActivationLink = async (req, res) => {
  const { email } = req.body;

  // التحقق من صحة البريد الإلكتروني
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Valid email address is required"
    });
  }

  try {
    const { data, error } = await supabase.auth.api.sendMagicLinkEmail(email);

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    // تسجيل إرسال رابط التفعيل
    await logUserActivity(null, 'resend_activation_link', { email });

    res.status(200).json({ success: true, message: "Activation email sent!" });
  } catch (err) {
    console.error('Error resending activation link:', err);
    res.status(500).json({ success: false, message: "Failed to resend activation email", error: err.message });
  }
};


// تعطيل حساب المستخدم
// Deactivate user account
export const deactivateUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized user' });
    }

    // Deactivate user by setting is_active to false in user metadata
    const { error: deactivateError } = await supabase.auth.admin.updateUserById(user.id, {
      user_metadata: { ...user.user_metadata, is_active: false }
    });

    if (deactivateError) {
      return res.status(500).json({
        success: false,
        message: 'Error while deactivating the account',
        error: deactivateError.message
      });
    }

    // Log user activity
    await logUserActivity(user.id, 'user_deactivated', { reason: 'User requested account deactivation' });

    // Sign out the user
    await supabase.auth.signOut();

    res.status(200).json({
      success: true,
      message: 'Account has been deactivated successfully'
    });

  } catch (error) {
    console.error('Error deactivating user:', error.message);
    res.status(500).json({
      success: false,
      message: 'Unexpected error while deactivating account',
      error: error.message
    });
  }
};

// Reactivate user account
export const reactivateUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized user' });
    }

    // Reactivate user by setting is_active to true in user metadata
    const { error: reactivateError } = await supabase.auth.admin.updateUserById(user.id, {
      user_metadata: { ...user.user_metadata, is_active: true }
    });

    if (reactivateError) {
      return res.status(500).json({
        success: false,
        message: 'Error while reactivating the account',
        error: reactivateError.message
      });
    }

    // Log user activity
    await logUserActivity(user.id, 'user_reactivated', { reason: 'User requested account reactivation' });

    res.status(200).json({
      success: true,
      message: 'Account has been reactivated successfully'
    });

  } catch (error) {
    console.error('Error reactivating user:', error.message);
    res.status(500).json({
      success: false,
      message: 'Unexpected error while reactivating account',
      error: error.message
    });
  }
};




// تحديث صورة البروفايل
export const updateProfilePicture = async (req, res) => {
  const userId = req.user.id;
  const { imageUrl } = req.body;

  // التحقق من صحة URL الصورة
  if (!imageUrl || !/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/.test(imageUrl)) {
    return res.status(400).json({
      success: false,
      message: "Invalid image URL. Please provide a valid image URL."
    });
  }

  try {
    // تحديث صورة الملف الشخصي
    const { data, error } = await supabase
      .from("users")
      .update({ profile_picture: imageUrl })
      .eq("id", userId);

    if (error) {
      console.error("Database update error:", error);
      return res.status(400).json({
        success: false,
        message: "Failed to update profile picture",
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      data
    });
  } catch (err) {
    console.error("Error during profile picture update:", err);
    res.status(500).json({
      success: false,
      message: "Update failed",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};


// تسجيل النشاطات


// جلب بيانات المستخدم
export const getUserProfile = async (req, res) => {
  // التأكد من وجود user في request
  const userId = req.user?.id;
  const requestingUserId = req.user?.id; // المستخدم الذي يطلب البيانات

  if (!userId) {
    return res.status(400).json({ 
      success: false, 
      message: "User ID is required" 
    });
  }

  // التحقق من أن المستخدم يطلب بياناته فقط (إلا إذا كان مديراً)
  if (userId !== requestingUserId && !req.user?.isAdmin) {
    return res.status(403).json({ 
      success: false, 
      message: "Unauthorized to access this user's profile" 
    });
  }

  try {
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // تصفية البيانات الحساسة قبل الإرسال
    const safeUserData = {
      id: user.id,
      firstName: user.first_name,
      secondName: user.second_name || '',
      name: user.first_name ? `${user.first_name} ${user.second_name || ''}`.trim() : user.name,
      email: user.email,
      avatar: user.avatar || user.profile_picture,
      phone: user.phone || '',
      isOAuthUser: user.is_oauth_user || false,
      authProvider: user.auth_provider || '',
      preferences: user.preferences || {},
      createdAt: user.created_at,
      updatedAt: user.updated_at
      // إضافة فقط الحقول الآمنة للعرض
    };

    res.status(200).json({ 
      success: true, 
      data: safeUserData 
    });

  } catch (err) {
    console.error('Error fetching user profile:', err);
    
    // رسالة خطأ آمنة للإنتاج
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'Could not fetch user profile';

    res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: errorMessage 
    });
  }
};



// تحديث بيانات المستخدم
export const updateUserProfile = async (req, res) => {
  const userId = req.user.id;
  const updateData = req.body;

  // التحقق من المدخلات
  if (!updateData || typeof updateData !== 'object') {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid data format" 
    });
  }

  // إضافة التحقق من وجود الحقول المطلوبة (مثل name أو avatar)
  if (updateData.name && typeof updateData.name !== 'string') {
    return res.status(400).json({ 
      success: false, 
      message: "Name must be a string" 
    });
  }

  try {
    // التحقق من وجود المستخدم
    const existingUser = await userService.getUserById(userId);
    if (!existingUser) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // تحديث بيانات المستخدم
    const updatedUser = await userService.updateUser(userId, updateData);

    // تصفية البيانات الحساسة قبل إرجاعها
    const safeUpdatedUserData = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      updatedAt: updatedUser.updated_at
      // إضافة الحقول الآمنة فقط
    };

    res.status(200).json({ 
      success: true, 
      message: "User updated successfully", 
      data: safeUpdatedUserData 
    });

  } catch (err) {
    console.error('Error updating user profile:', err);

    const errorMessage = process.env.NODE_ENV === 'development'
      ? err.message
      : 'Update failed due to a server error';

    res.status(500).json({ 
      success: false, 
      message: "Internal server error", 
      error: errorMessage 
    });
  }
};


// حذف المستخدم
export const deleteUser = async (req, res) => {
  const userId = req.user.id;

  try {
    // التحقق من وجود المستخدم قبل الحذف
    const existingUser = await userService.getUserById(userId);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // تنفيذ الحذف (قد تفضل الحذف المنطقي)
    await userService.deleteUser(userId);
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ success: false, message: "Deletion failed", error: err.message });
  }
};
export const registerUser = async (req, res) => {
  const { isValid, errors } = await validateData(signupSchema, req.body);
  
  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors
    });
  }

  // تحقق إضافي (على سبيل المثال، التحقق من وجود البريد الإلكتروني في النظام)
  const { email, password } = req.body;
  
  try {
    // التحقق من وجود البريد الإلكتروني في النظام
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // تسجيل المستخدم في قاعدة البيانات
    const newUser = await userService.registerUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: newUser
    });

  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: err.message
    });
  }
};

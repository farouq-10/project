// userService.js
import { supabase } from "../DB/connectionDb.js";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
// added to import in the db table


// تسجيل مستخدم جديد
export const signUp = async ({ firstName, secondName, email, phone, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        second_name: secondName,
        phone,
      },
    },
  });

  if (error) throw new Error(error.message);
  return data;
};

// تسجيل الدخول
export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data;
};

// استرجاع كلمة المرور
export const resetPassword = async (email) => {
  if (!email) {
    return { data: null, error: { message: "Email is required" } };
  }

  // Validate required environment variable
  if (!process.env.FRONTEND_URL) {
    console.error('Missing required environment variable: FRONTEND_URL');
    return { data: null, error: { message: "Server configuration error" } };
  }

  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL}/reset-password`,
    });
    return { data, error };
  } catch (err) {
    return { data: null, error: { message: err.message || "Unknown error" } };
  }
};

// تغيير كلمة المرور
export const changePassword = async (email, currentPassword, newPassword) => {
  const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
  });

  if (authError || !user) {
    return { success: false, message: "Current password is incorrect" };
  }

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    return { success: false, message: "Failed to update password", error: error.message };
  }

  return { success: true, data };
};

// جلب بيانات المستخدم حسب ID
export const getUserById = async (userId) => {
  if (!userId) throw new Error("User ID is required");
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

// تحديث المستخدم
export const updateUser = async (userId, updateData) => {
  if (!userId) throw new Error("User ID is required");
  const { data, error } = await supabase
    .from("users")
    .update(updateData)
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

// حذف المستخدم
export const deleteUser = async (userId) => {
  if (!userId) throw new Error("User ID is required");
  const { error } = await supabase.from("users").delete().eq("id", userId);
  if (error) throw new Error(error.message);
  return { success: true, message: "User deleted successfully" };
};

// التأكد من وجود الإيميل
export const checkEmailExists = async (email) => {
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .limit(1)
    .maybeSingle();

  if (error && error.code !== "PGRST116") {
    throw new Error("Database error while checking email");
  }

  return !!data;
};

// التأكد من وجود رقم الهاتف
export const checkPhoneExists = async (phone) => {
  const { data, error } = await supabase
    .from("users")
    .select("phone")
    .eq("phone", phone)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error("Database error while checking phone");
  }

  return !!data;
};


// add to the table
export const createOAuthUser = async (userInfo, provider) => {
  const { firstName, secondName, email, phone, password } = userInfo;

  // 1. Insert user into the public 'users' table
  const { data, error } = await supabase
    .from('users')
    .upsert([{
      id: userInfo.id, // Use the UID from Auth provider
      email,
      first_name: firstName,
      second_name: secondName,
      phone: phone || "",
      password: password || "google-oauth" ,
      is_oauth_user: true,
      auth_provider: provider,
      last_login: new Date().toISOString(),
    }],
    {onConflict: "email"}
  )
    .select() // Return the inserted record
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to create OAuth user: ${error.message}`);
  }
 return data;
};


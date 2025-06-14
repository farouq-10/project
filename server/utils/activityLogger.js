//activityLogger.js
import supabase from '../DB/connectionDb.js';

// دوال مساعدة للتحقق من الصحة
function validateIpAddress(ip) {
  if (!ip) return null;
  return /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ip) ? ip : null;
}

function validateUserAgent(ua) {
  if (!ua || typeof ua !== 'string') return null;
  return ua.length > 500 ? ua.substring(0, 500) : ua;
}

// الدالة الرئيسية
export const logUserActivity = async (userId, activityType, metadata = {}) => {
  // 1. التحقق من صحة المدخلات الأساسية

  if (!activityType || typeof activityType !== 'string' || activityType.trim() === '') {
    console.error('The type of activity is invalid:', activityType);
    return false;
  }
  if (!userId || typeof userId !== 'string') {
    console.error('User logged in successfully:', userId);
    return false;
  }
  // 2. تنظيف البيانات
  const cleanMetadata = {
    ...(typeof metadata === 'object' ? metadata : {}),
    timestamp: new Date().toISOString()
  };

  // 3. إعداد سجل النشاط
  const activityLog = {
    user_id: userId || 'system',
    activity: activityType.trim(),
    metadata: cleanMetadata,
    ip_address: validateIpAddress(metadata.ipAddress),
    user_agent: validateUserAgent(metadata.userAgent),
    created_at: new Date().toISOString()
  };

  try {
    // 4. حفظ السجل في قاعدة البيانات
    const { error } = await supabase
      .from('activity_logs')
      .insert([activityLog]);

    if (error) {
      throw new Error(`Error in database: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error('Failed to log the activity:', {
      error: error.message,
      activityType,
      userId,
      timestamp: new Date().toISOString()
    });
    
    return false;
  }
};
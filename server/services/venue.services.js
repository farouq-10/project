//venu service.js
import supabase from "../DB/connectionDb.js";  // تأكد من المسار النسبي الصحيح


export const createVenue = async (data) => {
  const defaultData = {
    ...data,
    image_url: data.image_url || null,
    description: data.description || '',
    created_at: new Date().toISOString() // تحسين إضافي
  };

  const { data: newVenue, error } = await supabase
    .from('venues')
    .insert([defaultData])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return newVenue;
};

// النسخة المحسنة مع الحفاظ على الوظيفة الأصلية
export const getAllVenues = async (filters = {}) => {
  let query = supabase.from('venues').select('*', { count: 'exact' });

  // إضافات جديدة للفلترة
  if (filters.minCapacity) {
    query = query.gte('capacity', filters.minCapacity);
  }
  if (filters.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);
  return { data, count }; // تعديل بسيط في الإرجاع
};

export const getVenueById = async (id) => {
  const { data, error } = await supabase
    .from('venues')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const updateVenue = async (id, updates) => {
  const { data, error } = await supabase
    .from('venues')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteVenue = async (id) => {
  const { error } = await supabase.from('venues').delete().eq('id', id);
  if (error) throw new Error(error.message);
};

// دالة جديدة اختيارية للتحقق من المالك
export const checkVenueOwner = async (venueId, userId) => {
  const { data, error } = await supabase
    .from('venues')
    .select('user_id')
    .eq('id', venueId)
    .single();
  
  if (error) throw new Error(error.message);
  return data.user_id === userId;
};


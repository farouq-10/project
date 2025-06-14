// payment.service.js
import supabase from '../DB/connectionDb.js';  // الاتصال بـ Supabase

// دالة إنشاء الدفع
export const createPayment = async ({ bookingId, userId, amount, method }) => {
  // إضافة عملية الدفع إلى قاعدة البيانات
  const { data: payment, error } = await supabase
    .from('payments')
    .insert({
      booking_id: bookingId,
      user_id: userId,
      amount,
      method,
      status: 'completed',
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return payment;
};

// دالة تأكيد الحجز (تحديث حالة الحجز وإنشاء عملية الدفع)
export const confirmBooking = async ({ bookingId, userId, amount, method }) => {
  // تحديث حالة الحجز في قاعدة البيانات
  const { data: updatedBooking, error: updateError } = await supabase
    .from('bookings')
    .update({ status: 'confirmed' })
    .eq('id', bookingId)
    .single();

  if (updateError) {
    throw new Error(updateError.message);
  }

  // إنشاء عملية الدفع
  const payment = await createPayment({
    bookingId,
    userId,
    amount,
    method,
  });

  // إعادة البيانات الخاصة بالحجز والدفع
  return { booking: updatedBooking, payment };
};


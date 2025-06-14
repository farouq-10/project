//booking controller
// controllers/booking.controller.js

import supabase from '../DB/connectionDb.js';
import { io } from '../app.js'; // استيراد io من app.js
//import { confirmBookingSchema, cancelBookingSchema } from '../validators/booking.validators.js';
// تأكيد الحجز
export const confirmBooking = async ({ bookingId, userId }) => {
  // تحقق من الحجز
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', bookingId)
    .single();

  if (bookingError || !booking) {
    throw new Error('Booking not found');
  }

  // تحديث حالة الحجز إلى تأكيد
  const { data: updatedBooking, error: updateError } = await supabase
    .from('bookings')
    .update({ status: 'confirmed' })
    .eq('id', bookingId)
    .single();

  if (updateError) {
    throw new Error(updateError.message);
  }

  // إرسال إشعار عند تأكيد الحجز فقط للمستخدم المعني
  const bookingDetails = { message: `Your booking for event ${booking.eventId} is confirmed!`, userId };

  // إرسال إشعار إلى العميل المعني فقط
  const userSocket = io.sockets.sockets.get(userId); // العثور على socket الخاص بالمستخدم
  if (userSocket) {
    userSocket.emit('bookingNotification', bookingDetails); // إرسال الإشعار للمستخدم المعني فقط
  }

  return updatedBooking;
};

// إلغاء الحجز
export const cancelBooking = async (bookingId) => {
  // 1. تحقق إذا كان الحجز موجودًا
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', bookingId)
    .single();

  if (bookingError || !booking) {
    throw new Error('Booking not found');
  }

  // 2. تحقق من حالة الدفع في جدول المدفوعات
  const { data: payment, error: paymentError } = await supabase
    .from('payments')
    .select('*')
    .eq('bookingId', bookingId)
    .single();

  if (paymentError || !payment) {
    throw new Error('Payment not found for this booking');
  }

  // 3. تحقق إذا كان قد تم الدفع
  if (payment.status === 'paid') {
    // إذا كانت الحالة "مدفوعة"، لا يمكن استرداد الأموال
    throw new Error('No refunds are allowed for this booking.');
  }

  // 4. إذا كان الدفع غير مدفوع أو فشل الدفع، يمكن الإلغاء
  const { error: cancelError } = await supabase
    .from('bookings')
    .update({ status: 'cancelled' })
    .eq('id', bookingId);

  if (cancelError) {
    throw new Error('Failed to cancel the booking');
  }

  return { message: 'Booking cancelled successfully' };
};

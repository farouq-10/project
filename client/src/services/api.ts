// client/src/services/api.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set the authentication token
export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// --- Event Endpoints ---
export const getEvents = () => apiClient.get('/events');
export const getEventById = (id: string) => apiClient.get(`/events/${id}`);
export const createEvent = (eventData: any) => apiClient.post('/events', eventData); // Example for creating an event
export const updateEvent = (id: string, eventData: any) => apiClient.put(`/events/${id}`, eventData); // Example for updating an event
export const deleteEvent = (id: string | number) => apiClient.delete(`/events/${id}`);
// Add more event-related functions as needed

// --- User Endpoints ---
export const loginUser = (credentials: any) => apiClient.post('/users/login', credentials);
export const signupUser = (userData: any) => apiClient.post('/users/signup', userData); // Assuming /users/signup, adjust if it's /signup directly
export const getCurrentUser = () => apiClient.get('/users/me'); // Example, adjust if endpoint is different
// Add user profile related functions
export const updateUserProfile = (userData: any) => apiClient.put('/users/me', userData);
export const updateProfilePicture = (imageData: FormData) => apiClient.patch('/users/profile-picture', imageData, {
  headers: {
    'Content-Type': 'multipart/form-data', // Important for file uploads
  },
});
export const changePassword = (passwordData: any) => apiClient.post('/users/change-password', passwordData);

// Add more user-related functions: updateUser, etc.

// --- Booking Endpoints ---
export const confirmBooking = (bookingId: string, userId: string) => apiClient.put(`/bookings/confirm/${bookingId}`, { userId });
export const cancelBooking = (bookingId: string) => apiClient.delete(`/bookings/cancel/${bookingId}`);

// --- Business Endpoints ---
export const registerBusiness = (businessData: any) => apiClient.post('/business', businessData);
export const getBusinessDetails = (businessId: string) => apiClient.get(`/business/${businessId}`);
export const updateBusiness = (businessId: string, businessData: any) => apiClient.put(`/business/${businessId}`, businessData);
export const deleteBusiness = (businessId: string) => apiClient.delete(`/business/${businessId}`);

// --- Chat Endpoints ---
export const sendMessage = (messageData: any) => apiClient.post('/chat', messageData);
export const getUserMessages = (otherUserId: string) => apiClient.get(`/chat/users/${otherUserId}`);
export const getEventMessages = (eventId: string) => apiClient.get(`/chat/events/${eventId}`);
export const deleteMessage = (messageId: string) => apiClient.delete(`/chat/${messageId}`);

// --- Gallery Endpoints ---
export const uploadEventImages = (eventId: string, imageData: any) => apiClient.post(`/gallery/events/${eventId}/images`, imageData, {
  headers: {
    'Content-Type': 'multipart/form-data', // Important for file uploads
  },
});

// --- Guest Endpoints ---
export const addGuestToEvent = (eventId: string, guestData: any) => apiClient.post(`/guests/events/${eventId}/guests`, guestData);

// --- Venue Endpoints ---
export const createVenue = (venueData: any) => apiClient.post('/venues', venueData);
export const getAllVenues = (params?: any) => apiClient.get('/venues', { params }); // Added params for potential filtering like /venues/filter
export const getVenueById = (id: string) => apiClient.get(`/venues/${id}`);
export const updateVenue = (id: string, venueData: any) => apiClient.put(`/venues/${id}`, venueData);
export const deleteVenue = (id: string) => apiClient.delete(`/venues/${id}`);

// --- FAQ Endpoints ---
export const getFaqs = () => apiClient.get('/faqs');

// --- Support Endpoints ---
export const createSupportTicket = (ticketData: any) => apiClient.post('/support/tickets', ticketData);

// --- Guide Endpoints ---
export const getGuides = () => apiClient.get('/guides');

// --- Payment Endpoints ---
export const createPaymentIntent = (paymentData: any) => apiClient.post('/payments/create-intent', paymentData);

// Example of using a direct signup route if it's not under /users
// export const directSignup = (userData: any) => axios.post('http://localhost:5000/signup', userData);

export default apiClient;
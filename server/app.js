//app.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io'; // Using socket.io correctly

// Load environment variables
dotenv.config();
import eventRoutes from './routes/event.routes.js';
import userRoutes from './routes/user.routes.js';
import faqRoutes from './routes/faq.routes.js';
import supportRoutes from './routes/support.routes.js';
import guideRoutes from './routes/guide.routes.js';
import { signupSchema } from './validators/user.validators.js';
import validate from './middlewares/validate.js'; // Import middleware
import paymentRoutes from './routes/payment.routes.js';
const app = express();

// CORS settings and enable JSON parsing
app.use(cors());
app.use(express.json());

// Add routes for events and users
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/guides', guideRoutes);


// Home Route
app.get("/", (req, res) => {
  res.send("Event Management API is running");
});

// Create HTTP server and Socket.io
const server = http.createServer(app);
const io = new Server(server); // Connect socket.io with server

// Handle socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Register user with socket
  socket.on('register', (userId) => {
    console.log(`User ${userId} registered with socket ${socket.id}`);
    // Store the userId in the socket object for reference
    socket.userId = userId;
  });

  // Receive new message from client
  socket.on('sendMessage', (message) => {
    console.log('Received message:', message);
    io.emit('receiveMessage', message); // Send message to all clients
  });

  // Notification when booking is confirmed
  socket.on('bookingConfirmed', (bookingDetails) => {
    console.log('Booking confirmed:', bookingDetails);
    io.emit('bookingNotification', bookingDetails); // Send notification to users
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Server is started in server.js after importing this app module
// The listen call will use the PORT defined in server.js
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

export default app;
export { io };

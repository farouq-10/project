//server.js
import dotenv from 'dotenv';
import app from "./app.js";

// Load environment variables
dotenv.config();

// This file now imports the app and starts the server.

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log(`App configured for ${NODE_ENV} mode on port ${PORT}`);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} in ${NODE_ENV} mode`);
});

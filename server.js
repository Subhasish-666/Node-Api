// Import required packages
require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/db");

//specify port no
const PORT = 3000;
// Import routes
const eventRoutes = require("./src/routes/routes");

// Create express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Register event routes
// All event APIs will start with /api/v3/app/events
app.use("/api/v3/app", eventRoutes);

// Connect to MongoDB first, then start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  });


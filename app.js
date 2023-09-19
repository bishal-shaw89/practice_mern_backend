const express = require("express");
const mongoose = require("mongoose");
const config = require("./src/config");
const authRoutes = require("./src/routes/authRoutes");
const errorMiddleware = require("./src/middleware/errorMiddleware");

const app = express();

// Connect to MongoDB
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log("DB connection error -> ", error);
  });

// Middleware to parse JSON requests
app.use(express.json());

// Define Routes
app.use("/auth", authRoutes);

// Error handling Middleware
app.use(errorMiddleware);

// start the server
app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js"; // Import error handling middleware

dotenv.config();
const Port = process.env.PORT || 5000;
connectDB();

const app = express();

// Configure CORS to allow requests from your frontend
app.use(
  cors({
    origin: "https://checkout-form-app.vercel.app", // Replace with your actual frontend URL
  })
);

app.use(express.json()); // Middleware to parse JSON bodies

// Mount the order routes at the root
app.use("/", orderRoutes);

// Error handling middleware should be the last middleware
app.use(errorHandler);

app.listen(Port, () => {
  console.log(`Server is running at http://localhost:${Port}`);
});

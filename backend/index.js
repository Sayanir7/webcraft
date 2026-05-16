import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import chatRoutes from './routes/chat.route.js';
import { verifyToken } from './utils/verifyUser.js';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(cookieParser());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/api/chat/gemini', verifyToken, async (req, res) => {
  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
  const API_KEY = process.env.GEMINI_API_KEY;

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required." });
    }

    if (!API_KEY) {
      return res.status(500).json({ message: "Gemini API key is not configured on the server." });
    }

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] } ),
    });

    const data = await response.json();

    if (!response.ok) {
      const message =
        data?.error?.message ||
        (response.status === 429 ? "Rate limit exceeded. Try again later." : "Failed to fetch response from Gemini.");

      return res.status(response.status).json({ message });
    }

    res.json({ message: data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
});



// API Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});

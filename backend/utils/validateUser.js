import User from "../models/user.model.js";
import { errorHandler } from "./error.js";

// Validate Email
export const validateEmail = async (email, userId = null) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw errorHandler(400, "Invalid email format");
  }
  // Validate Unique Email
  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser._id.toString() !== userId) {
    throw errorHandler(400, "Email is already in use");
  }
};

// Validate Password
export const validatePassword = (password) => {
  if (password.length < 6) {
    throw errorHandler(400, "Password must be at least 6 characters");
  }
};

// Validate Username (if provided)
export const validateUsername = async (username, userId = null) => {
  if (username.length < 3 || username.length > 20) {
    throw errorHandler(400, "Username must be between 3 and 20 characters");
  }
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    throw errorHandler(400, "Username can only contain letters and numbers");
  }

  // Check if username is already taken
  const existingUser = await User.findOne({ username });
  if (existingUser && existingUser._id.toString() !== userId) {
    throw errorHandler(400, "Username is already taken");
  }
};
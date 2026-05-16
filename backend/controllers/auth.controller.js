import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import { validateEmail, validatePassword, validateUsername } from "../utils/validateUser.js";
import { OAuth2Client } from "google-auth-library";
import dotenv from 'dotenv';

dotenv.config();

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw errorHandler(400, "All fields are required");
    }

    await validateUsername(username);
    await validateEmail(email);
    validatePassword(password);

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT token after successful signup
    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET
    );

    // Remove password from response
    const { password: pass, ...userDetails } = newUser._doc;

    // Send token in cookie and user details in response
    res
      .status(201)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:process.env.NODE_ENV === "production"?"None":"Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .json(userDetails);

  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || error.keyValue || {})[0];
      return next(errorHandler(400, field === "email" ? "Email is already in use" : "Username is already taken"));
    }

    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
       secure: process.env.NODE_ENV === "production",
        sameSite:process.env.NODE_ENV === "production"?"None":"Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// google

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createGoogleUsername = async (name, email) => {
  const emailPrefix = email.split("@")[0];
  const base = (name || emailPrefix)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 16) || "user";

  let username = base;
  let suffix = 1;

  while (await User.findOne({ username })) {
    const suffixText = String(suffix);
    username = `${base.slice(0, 20 - suffixText.length)}${suffixText}`;
    suffix += 1;
  }

  return username;
};

export const google = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) return next(errorHandler(400, "Google token missing"));

    // Verify Google ID Token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;
    // console.log(email,name,picture);

    if (!email) return next(errorHandler(400, "Google account email missing"));

    // Check or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username: await createGoogleUsername(name, email),
        email,
        password: bcryptjs.hashSync(email + process.env.JWT_SECRET, 10), // dummy password
        profilePic: picture,
      });

      await user.save();
      
    }

    // Create your own JWT
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    const { password, ...userData } = user._doc;

    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:process.env.NODE_ENV === "production"?"None":"Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .status(200)
      .json(userData);
  } catch (err) {
    if (err.code === 11000) {
      return next(errorHandler(400, "A user with this Google account already exists. Please try signing in again."));
    }

    next(errorHandler(400, err.message || "Google authentication failed"));
  }
};

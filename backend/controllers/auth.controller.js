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
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(userDetails);

  } catch (error) {
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
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// google

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

    // Check or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username: name.toLowerCase().replace(/\s+/g, "_"),
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
        sameSite: "Lax",
      })
      .status(200)
      .json(userData);
  } catch (err) {
    next(errorHandler(400, err));
  }
};
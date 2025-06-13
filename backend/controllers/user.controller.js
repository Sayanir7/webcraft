import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';
import { validateEmail, validatePassword, validateUsername } from "../utils/validateUser.js";

export const test = (req, res) => {
    res.json({ message: 'API is working!' });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }

  try {
    const updates = {}; // Store only fields that need to be updated

    if (req.body.username) {
      await validateUsername(req.body.username, req.params.userId);
      updates.username = req.body.username;
    }

    if (req.body.email) {
      await validateEmail(req.body.email, req.params.userId);
      updates.email = req.body.email;
    }

    if (req.body.password) {
      validatePassword(req.body.password);
      updates.password = bcryptjs.hashSync(req.body.password, 10);
    }

    if (Object.keys(updates).length === 0) {
      return next(errorHandler(400, "No valid fields provided for update"));
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: updates },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);

  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this user'));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User has been signed out');
  } catch (error) {
    next(error);
  }
};
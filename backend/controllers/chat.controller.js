import Chat from '../models/chat.model.js';
import { errorHandler } from '../utils/error.js';

// Get all chat titles for a user
export const getAllChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({ user: req.user.id }).select('title');
    res.status(200).json(chats);
  } catch (error) {
    next(errorHandler(500, 'Failed to fetch chats.'));
  }
};

// Get a single chat (except code) by ID
export const getChatById = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.chatId).select("user title context promptsAndResponses.prompt promptsAndResponses.response.textOverview");

    if (!chat) return next(errorHandler(404, "Chat not found."));

    if (chat.user.toString() !== req.user.id) {
      return next(errorHandler(403, "You are not allowed to access this chat."));
    }

    res.status(200).json(chat);
  } catch (error) {
    next(errorHandler(500, "Failed to fetch chat."));
  }
};

// Create a new chat
export const createChat = async (req, res, next) => {
  try {
    const { title, context , prompt , response } = req.body;

    const chat = await Chat.create({
      user: req.user.id,
      title,
      context,
      promptsAndResponses: [{ prompt, response }],
    });

    res.status(201).json({ _id: chat._id, message: "Chat created successfully" });
  } catch (error) {
    next(errorHandler(500, "Failed to create chat."));
  }
};

export const updateChat = async (req, res, next) => {
  try {
    const {context, prompt, response } = req.body;
    
    // First verify ownership with minimal data fetch
    const chatExists = await Chat.findOne(
      { 
        _id: req.params.chatId,
        user: req.user.id
      },
      { _id: 1 }
    );

    if (!chatExists) {
      return next(errorHandler(404, 'Chat not found or unauthorized.'));
    }

    // Update chat with new prompt-response
    await Chat.findByIdAndUpdate(
      req.params.chatId,
      {
        $set: { context }, 
        $push: { 
          promptsAndResponses: { 
            prompt,
            response: {
              textOverview: response.textOverview,
              html: response.html,
              css: response.css,
              script: response.script
            }
          }
        }
      }
    );

    res.status(200).json({ message: "Chat updated successfully" });
  } catch (error) {
    next(errorHandler(500, 'Failed to update chat.'));
  }
};

export const deleteChat = async (req, res, next) => {
  try {
    // Combined ownership check and deletion in one query
    const result = await Chat.deleteOne({
      _id: req.params.chatId,
      user: req.user.id
    });

    if (result.deletedCount === 0) {
      return next(errorHandler(404, 'Chat not found or unauthorized.'));
    }

    res.status(200).json({ message: 'Chat deleted successfully.' });
  } catch (error) {
    next(errorHandler(500, 'Failed to delete chat.'));
  }
};

// Delete all chats by the user
export const deleteAllChats = async (req, res, next) => {
  try {
    await Chat.deleteMany({ user: req.user.id });
    res.status(200).json({ message: 'All user chats deleted successfully.' });
  } catch (error) {
    next(errorHandler(500, 'Failed to delete user chats.'));
  }
};

export const getCodeByVersion = async (req, res, next) => {
  try {
    const { chatId, version } = req.params;
    const versionIndex = parseInt(version);

    // Using lean() for better performance since we don't need Mongoose document features
    const chat = await Chat.findById(chatId)
      .select({
        user: 1,
        'promptsAndResponses': {
          $slice: [versionIndex, 1]  // Efficient: Gets only the specific version
        }
      })
      .lean();  // Added for performance

    if (!chat) return next(errorHandler(404, "Chat not found."));
    
    // Verify ownership
    if (chat.user.toString() !== req.user.id) {
      return next(errorHandler(403, "You are not allowed to access this code."));
    }

    // Null check with optional chaining and early return
    const response = chat.promptsAndResponses[0]?.response;
    if (!response) {
      return next(errorHandler(404, "Version not found or no response available."));
    }

    // Destructure only needed fields
    const { html = '', css = '', script = '' } = response;
    res.status(200).json({ html, css, script });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const updateCodeByVersion = async (req, res, next) => {
  try {
    const { chatId, version } = req.params;
    const { html, css, script } = req.body;
    const versionIndex = parseInt(version);

    // Combine ownership check and update in a single query for better performance
    const updateObj = {};
    if (html !== undefined) updateObj[`promptsAndResponses.${versionIndex}.response.html`] = html;
    if (css !== undefined) updateObj[`promptsAndResponses.${versionIndex}.response.css`] = css;
    if (script !== undefined) updateObj[`promptsAndResponses.${versionIndex}.response.script`] = script;

    const updatedChat = await Chat.findOneAndUpdate(
      {
        _id: chatId,
        user: req.user.id,  // Ownership check in the same query
        [`promptsAndResponses.${versionIndex}`]: { $exists: true }
      },
      { $set: updateObj },
      { 
        new: true,
        projection: { [`promptsAndResponses.${versionIndex}.response`]: 1 },
        runValidators: true  // Added for data integrity
      }
    ).lean();  // Added for performance

    if (!updatedChat) {
      return next(errorHandler(404, "Chat not found, unauthorized, or version doesn't exist."));
    }

    res.status(200).json({ message: "Code updated successfully" });
  } catch (error) {
    next(errorHandler(500, "Failed to update code version."));
  }
};
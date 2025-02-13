import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  textOverview: { type: String, required: true },
  html: { type: String, default: '' },
  css: { type: String, default: '' },
  script: { type: String, default: '' },
});

const chatSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    context: { type: String, required: true },
    promptsAndResponses: [
      {
        prompt: { type: String, required: true },
        response: { type: responseSchema, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
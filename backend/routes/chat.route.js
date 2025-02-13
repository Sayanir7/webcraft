import express from 'express';
import { 
  getAllChats, 
  getChatById, 
  createChat, 
  updateChat, 
  deleteChat, 
  deleteAllChats,
  getCodeByVersion,
  updateCodeByVersion
} from '../controllers/chat.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', verifyToken, getAllChats);
router.get('/:chatId', verifyToken, getChatById);
router.post('/', verifyToken, createChat);
router.put('/:chatId', verifyToken, updateChat);
router.delete('/:chatId', verifyToken, deleteChat);
router.delete('/', verifyToken, deleteAllChats);

router.get("/:chatId/code/:version", verifyToken, getCodeByVersion);
router.put("/:chatId/code/:version", verifyToken, updateCodeByVersion);

export default router;
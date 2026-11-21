import { Router } from 'express';
import { createMessage } from '../controllers/messageController.js';
import { validateMessage } from '../middlewares/validateMessage.js';
import { messageRateLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

// POST /api/messages
router.post('/', messageRateLimiter, validateMessage, createMessage);

export default router;

import express from 'express';
import { getBookmarks, toggleBookmark } from '../controllers/bookmarkController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', auth, getBookmarks);
router.post('/toggle', auth, toggleBookmark);

export default router;

import express from 'express';
import { getBookmarks, toggleBookmark } from '../controllers/bookmarkController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route GET /api/bookmarks
 * @desc Retrieve all bookmarks for the authenticated user
 * @access Private (Requires JWT token)
 */
router.get('/', auth, getBookmarks);

/**
 * @route POST /api/bookmarks/toggle
 * @desc Add or remove a bookmark for the authenticated user
 * @access Private (Requires JWT token)
 */
router.post('/toggle', auth, toggleBookmark);

export default router;

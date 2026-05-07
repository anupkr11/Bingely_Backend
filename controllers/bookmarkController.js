import Bookmark from '../models/bookmarkModel.js';

/**
 * Retrieve all bookmarks for the authenticated user
 * @route GET /api/bookmarks
 * @param {Object} req - Express request object (must contain req.userId from auth middleware)
 * @param {Object} res - Express response object
 */
export const getBookmarks = async (req, res) => {
  try {
    // Find all bookmarks associated with the logged-in user's ID
    const bookmarks = await Bookmark.find({ userId: req.userId });
    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong while fetching bookmarks' });
  }
};

/**
 * Add a new bookmark or remove it if it already exists (Toggle)
 * @route POST /api/bookmarks/toggle
 * @param {Object} req - Express request object containing media details
 * @param {Object} res - Express response object
 */
export const toggleBookmark = async (req, res) => {
  try {
    const { tmdbId, title, type, posterPath, year, rating } = req.body;
    const userId = req.userId;

    // Check if the user has already bookmarked this specific TMDB item
    const existingBookmark = await Bookmark.findOne({ userId, tmdbId });

    if (existingBookmark) {
      // If it exists, remove it (toggle off)
      await Bookmark.findByIdAndDelete(existingBookmark._id);
      return res.status(200).json({ message: 'Removed from bookmarks', action: 'removed', tmdbId });
    } else {
      // If it doesn't exist, create and save a new bookmark (toggle on)
      const newBookmark = new Bookmark({
        userId,
        tmdbId,
        title,
        type,
        posterPath,
        year,
        rating
      });
      await newBookmark.save();
      return res.status(201).json({ message: 'Added to bookmarks', action: 'added', bookmark: newBookmark });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong while toggling bookmark' });
  }
};

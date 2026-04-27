import Bookmark from '../models/bookmarkModel.js';

export const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.userId });
    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const toggleBookmark = async (req, res) => {
  try {
    const { tmdbId, title, type, posterPath, year, rating } = req.body;
    const userId = req.userId;

    const existingBookmark = await Bookmark.findOne({ userId, tmdbId });

    if (existingBookmark) {
      await Bookmark.findByIdAndDelete(existingBookmark._id);
      return res.status(200).json({ message: 'Removed from bookmarks', action: 'removed', tmdbId });
    } else {
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
    res.status(500).json({ message: 'Something went wrong' });
  }
};

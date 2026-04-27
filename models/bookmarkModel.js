import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tmdbId: {
    type: Number,
    required: true,
  },
  title: String,
  type: {
    type: String,
    enum: ['movie', 'tv'],
    required: true,
  },
  posterPath: String,
  year: String,
  rating: String,
}, {
  timestamps: true,
  collection: 'bookmarks'
});

// Compound index to ensure a user can bookmark a specific item only once
bookmarkSchema.index({ userId: 1, tmdbId: 1 }, { unique: true });

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
export default Bookmark;

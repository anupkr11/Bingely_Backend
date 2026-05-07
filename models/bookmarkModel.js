import mongoose from 'mongoose';

/**
 * Bookmark Schema Definition
 * Represents a movie or TV show saved by a user to their personal library.
 */
const bookmarkSchema = new mongoose.Schema({
  // Reference to the User who created this bookmark
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // The unique identifier from the external TMDB API
  tmdbId: {
    type: Number,
    required: true,
  },
  // Title of the movie or TV show
  title: String,
  // Indicates whether the media is a movie or a TV series
  type: {
    type: String,
    enum: ['movie', 'tv'],
    required: true,
  },
  // Path to the media's poster image
  posterPath: String,
  // Release year of the media
  year: String,
  // Rating or score of the media
  rating: String,
}, {
  // Automatically manage createdAt and updatedAt timestamps
  timestamps: true,
  // Explicitly set the collection name
  collection: 'bookmarks'
});

// Compound index to ensure a user can bookmark a specific TMDB item only once
// This prevents duplicate bookmarks for the same user
bookmarkSchema.index({ userId: 1, tmdbId: 1 }, { unique: true });

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
export default Bookmark;

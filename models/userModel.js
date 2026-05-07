import mongoose from 'mongoose';

/**
 * User Schema Definition
 * Represents a registered user in the database.
 */
const userSchema = new mongoose.Schema({
  // User's first name
  firstName: {
    type: String,
    required: true,
  },
  // User's last name
  lastName: {
    type: String,
    required: true,
  },
  // Unique email address used for login and identification
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Securely hashed password
  password: {
    type: String,
    required: true,
  },
  // Optional URL or path to user's profile image
  profileImage: {
    type: String,
    default: '',
  },
}, {
  // Automatically manage createdAt and updatedAt timestamps
  timestamps: true,
  // Explicitly set the collection name
  collection: 'users'
});

const User = mongoose.model('User', userSchema);
export default User;

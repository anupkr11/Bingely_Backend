import jwt from 'jsonwebtoken';

/**
 * Authentication Middleware
 * Intercepts requests to verify the presence and validity of a JWT.
 * If valid, attaches the user ID to the request object and proceeds.
 * If invalid or missing, returns a 401 Unauthorized response.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const auth = (req, res, next) => {
  try {
    // Extract token from 'Authorization: Bearer <token>' header
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Authentication failed: No token provided' });

    // Verify token using the secret key
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user ID to the request object for downstream use
    req.userId = decodedData?.id;

    // Pass control to the next middleware or route handler
    next();
  } catch (error) {
    // Catch token expiration, invalid signatures, or missing headers
    res.status(401).json({ message: 'Authentication failed: Invalid token' });
  }
};

export default auth;

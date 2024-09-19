import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'fallback_secret';  // Ensure this is the same key used during token creation

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from the Bearer header

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);  // Verify the token with the same secretKey
    req.user = decoded.id;  // Store the decoded user ID in req.user for further use
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default authMiddleware;

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ success: false, message: 'Invalid or expired token' });

      req.user = user;
      next();
    });
  };

  export const authenticateAdmin = (req, res, next) => {
    const { role } = req.user;

    if(role !== 'admin') return res.status(403).json({ success: false, message: 'Unauthorized' });

    next();
  };

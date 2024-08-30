import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../mongodb/models/User.js';
import { authenticateToken, authenticateAdmin } from '../middleware/authMiddleware.js';

dotenv.config();

const router = express.Router();


router.put('/profile', authenticateToken, async (req, res) => {
  const { name, email, password, avatar } = req.body;
  const userId = req.user.id; // L'ID de l'utilisateur provient du token JWT

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      if (name) user.name = name;
      if (email) user.email = email;
      if (avatar) user.avatar = avatar;

      if (password) {
          const hashedPassword = await bcrypt.hash(password, 10);
          user.password = hashedPassword;
      }

      await user.save();
      res.status(200).json({ success: true, message: 'Profile updated successfully', user });
  } catch (err) {
      console.error('Profile update error:', err);
      res.status(500).json({ success: false, message: 'Unable to update profile' });
  }
});

router.get('/profile', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
      const user = await User.findById
      (userId);
      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.status(200).json({ success: true, user });
  } catch (err) {
      console.error('Profile fetch error:', err);
      res.status(500).json({ success: false, message: 'Unable to fetch profile' });
  }
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Unable to register the user' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ success: false, message: 'Invalid credentials - user not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ success: false, message: 'Invalid credentials - password does not match' });
      }

      // Inclure le rôle de l'utilisateur dans le token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({
          success: true,
          token,
          user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
              role: user.role,
          }
      });
  } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ success: false, message: 'Unable to login the user' });
  }
});

    router.get('/users', authenticateToken, authenticateAdmin, async (req, res) => {
        try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
        } catch (err) {
        res.status(500).json({ success: false, message: 'Fetching users failed, please try again' });
        }
    });

    router.put('/users/:id', authenticateToken, authenticateAdmin, async (req, res) => {
      const { id } = req.params;
      const { name, email, role, password } = req.body;

      try {
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (role) user.role = role;
        if (password) {
          const hashedPassword = await bcrypt.hash(password, 10);
          user.password = hashedPassword;
        }

        await user.save();
        res.status(200).json({ success: true, message: 'User updated successfully', user });
      } catch (err) {
        console.error('User update error:', err);
        res.status(500).json({ success: false, message: 'Unable to update user' });
      }
    });

    router.delete('/users/:id', authenticateToken, authenticateAdmin, async (req, res) => {
        const { id } = req.params;

        try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'User deleted successfully' });
        } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ success: false, message: 'Failed to delete user' });
        }
    });


export default router;

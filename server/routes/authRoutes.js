import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import cloudinary from '../config/cloudinaryConfig.js';
import dotenv from 'dotenv';
import User from '../mongodb/models/User.js';
import { authenticateToken, authenticateAdmin } from '../middleware/authMiddleware.js';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';


dotenv.config();

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Nom du fichier unique
  },
});

const upload = multer({ storage: storage });

router.put('/profile', authenticateToken, upload.single('profilePicture'), async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ success: false, message: 'User ID not found' });

  const { username, email, showExplicitContent, interests } = req.body;

  try {
      let updatedData = {
          name: username,
          email,
          showExplicitContent: showExplicitContent === 'true',
      };

      // Gestion de l'upload de l'image de profil
      if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path);
          console.log('Cloudinary upload result:', result);

          updatedData.avatar = result.secure_url;

          fs.unlinkSync(req.file.path); // Suppression du fichier temporaire
      }

      let validInterests = [];
      if (interests) {
          try {
              const interestsArray = JSON.parse(interests); // Convertir la chaîne JSON en tableau
              validInterests = interestsArray
                  .map(id => mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : null) // Utiliser 'new' pour instancier ObjectId
                  .filter(id => id !== null);
          } catch (error) {
              console.error('Error parsing interests:', error);
              return res.status(400).json({ success: false, message: 'Invalid interests format' });
          }
      }


      updatedData.interests = validInterests;

      const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true, runValidators: true });

      if (!updatedUser) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.json({ success: true, user: updatedUser });
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ success: false, message: 'Server error' });
  }
});



router.get('/profile', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ success: false, message: 'Unable to fetch profile' });
  }
});

router.delete('/delete-account', authenticateToken, async (req, res) => {
  try {
      const userId = req.user.id;
      await User.findByIdAndDelete(userId);
      res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
      console.error('Error deleting account:', error);
      res.status(500).json({ message: 'Failed to delete account' });
  }
});

router.put('/change-password', authenticateToken, async (req, res) => {
  try {
      const { newPassword } = req.body;

      const userId = req.user.id;

      if (!userId) {
          return res.status(400).json({ message: 'User ID is missing.' });
      }

      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: 'Password changed successfully.' });
  } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ message: 'Failed to change password.' });
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

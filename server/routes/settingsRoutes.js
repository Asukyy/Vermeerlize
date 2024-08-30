import express from 'express';
import Settings from '../mongodb/models/Settings.js';
import { authenticateToken, authenticateAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const newSettings = new Settings(req.body);
    await newSettings.save();
    res.status(201).json(newSettings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const settings = await Settings.find();
    res.status(200).json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

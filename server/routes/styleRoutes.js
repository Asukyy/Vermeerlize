import express from 'express';
import Style from '../mongodb/models/Style.js';
import { authenticateToken, authenticateAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const newStyle = new Style(req.body);
    await newStyle.save();
    res.status(201).json(newStyle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const styles = await Style.find();
    res.status(200).json(styles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

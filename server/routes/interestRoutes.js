import express from 'express';
import Interest from '../mongodb/models/interest.js';
import { authenticateToken, authenticateAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const interests = await Interest.find();
    res.status(200).json({ success: true, data: interests });
  } catch (err) {
    console.error('Error fetching interests:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch interests' });
  }
});

router.post('/', authenticateToken, authenticateAdmin, async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: 'Name is required' });
  }

  try {
    const newInterest = new Interest({ name });
    await newInterest.save();
    res.status(201).json({ success: true, data: newInterest });
  } catch (err) {
    console.error('Error creating interest:', err);
    res.status(500).json({ success: false, message: 'Failed to create interest' });
  }
});

router.delete('/:id', authenticateToken, authenticateAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const interest = await Interest.findByIdAndDelete(id);
    if (!interest) {
      return res.status(404).json({ success: false, message: 'Interest not found' });
    }
    res.status(200).json({ success: true, message: 'Interest deleted successfully' });
  } catch (err) {
    console.error('Error deleting interest:', err);
    res.status(500).json({ success: false, message: 'Failed to delete interest' });
  }
});

export default router;

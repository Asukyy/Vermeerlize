import express from 'express';
import Format from '../mongodb/models/Format.js';
import CategorieFormat from '../mongodb/models/categorieFormat.js';
import { authenticateToken, authenticateAdmin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/', authenticateToken, authenticateAdmin, async (req, res) => {
  const { CategorieFormat: categorieFormatId, width, height } = req.body;

  try {
    const categorieExists = await CategorieFormat.exists({ _id: categorieFormatId });
    if (!categorieExists) {
      return res.status(400).json({ success: false, message: 'Invalid CategorieFormat ID' });
    }

    const newFormat = new Format({
      width,
      height,
      CategorieFormat: categorieFormatId,
    });

    await newFormat.save();

    res.status(201).json({ success: true, data: newFormat });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const formats = await Format.find();
    res.status(200).json(formats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', authenticateToken, authenticateAdmin, async (req, res) => {
    const { id } = req.params;

    try {
      const deletedFormat = await Format.findByIdAndDelete(id);

      if (!deletedFormat) {
        return res.status(404).json({ success: false, message: 'Format not found' });
      }

      res.status(200).json({ success: true, message: 'Format deleted successfully' });
    } catch (err) {
      console.error('Error deleting format:', err);
      res.status(500).json({ success: false, message: 'Failed to delete format' });
    }
  });

export default router;

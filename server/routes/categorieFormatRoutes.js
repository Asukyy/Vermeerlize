import express from 'express';
import CategorieFormat from '../mongodb/models/categorieFormat.js';
import Format from '../mongodb/models/Format.js';
import { authenticateToken, authenticateAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, authenticateAdmin, async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: 'Name is required' });
  }

  try {
    const newCategorieFormat = new CategorieFormat({ name });
    await newCategorieFormat.save();
    res.status(201).json({ success: true, data: newCategorieFormat });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create categorie format' });
  }
});

router.get('/', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const categorieFormats = await CategorieFormat.find();
    res.status(200).json({ success: true, data: categorieFormats });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch categorie formats' });
  }
});

router.delete('/:id', authenticateToken, authenticateAdmin, async (req, res) => {
    const { id } = req.params;

    try {
      await Format.deleteMany({ categorieFormatId: id });

      const deletedCategorieFormat = await CategorieFormat.findByIdAndDelete(id);

      if (!deletedCategorieFormat) {
        return res.status(404).json({ success: false, message: 'Categorie format not found' });
      }

      res.status(200).json({ success: true, message: 'Categorie format deleted successfully' });
    } catch (err) {
      console.error('Error deleting categorie format:', err);
      res.status(500).json({ success: false, message: 'Failed to delete categorie format' });
    }
  });

export default router;

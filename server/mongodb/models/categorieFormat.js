import mongoose from 'mongoose';

const CategorieFormatSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const CategorieFormat = mongoose.model('CategorieFormat', CategorieFormatSchema);

export default CategorieFormat;

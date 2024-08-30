import mongoose from 'mongoose';

const FormatSchema = new mongoose.Schema({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  CategorieFormat: { type: mongoose.Schema.Types.ObjectId, ref: 'CategorieFormat', required: true },
});

const Format = mongoose.model('Format', FormatSchema);
export default Format;

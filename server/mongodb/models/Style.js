import mongoose from 'mongoose';

const StyleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
});

const Style = mongoose.model('Style', StyleSchema);
export default Style;

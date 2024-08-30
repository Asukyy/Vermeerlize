import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  contrast: { type: Number, default: 50 },
  transparency: { type: Boolean, default: false },
  tiling: { type: Boolean, default: false },
  negativePrompt: { type: Boolean, default: false },
  numImages: { type: Number, default: 3 },
});

const Settings = mongoose.model('Settings', SettingsSchema);
export default Settings;

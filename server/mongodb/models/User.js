import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '', required: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  money: { type: Number, default: 150 },
  interests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interest', required: false }],
  showExplicitContent: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

export default User;

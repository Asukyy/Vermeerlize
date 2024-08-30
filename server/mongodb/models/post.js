import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence à l'utilisateur
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isPublic: { type: Boolean, default: false },
  style: { type: mongoose.Schema.Types.ObjectId, ref: 'Style', required: false }, // Référence au style
  format: { type: mongoose.Schema.Types.ObjectId, ref: 'Format', required: false }, // Référence au format d'image
  settings: { type: mongoose.Schema.Types.ObjectId, ref: 'Settings', required: false }, // Référence aux autres paramètres
});

const Post = mongoose.model('Post', PostSchema);

export default Post;

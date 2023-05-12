const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  message: { type: String, minLength: 5, maxLength: 255, required: true },
  likes: { type: Number, min: 0, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  replies: [{ type: String }]
});

module.exports = mongoose.model('Comment', CommentSchema);
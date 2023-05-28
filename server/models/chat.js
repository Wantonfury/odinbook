const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  messages: [{
    message: { type: String, minLength: 1, maxLength: 100, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    date: { type: Date, required: true },
    read: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
  }]
});

module.exports = mongoose.model('Chat', ChatSchema);
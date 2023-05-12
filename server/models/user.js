const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  username: { type: String, minLength: 3, required: true, unique: true },
  password: { type: String, minLength: 8, required: true },
  first_name: { type: String, minLength: 2, required: true },
  last_name: { type: String, minLength: 2, required: true },
  age: { type: Number, minValue: 13, required: true },
});

UserSchema.pre('save', function(next) {
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
  
  next();
});

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("User", UserSchema);
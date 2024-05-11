const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    isActive: { type: Boolean, required: true, default: true }
  }, {
    versionKey: false,
    timestamps: true
});
  
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;

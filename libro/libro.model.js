const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author: {type: String, required: true},
    genre: {type: String, required: true},
    date: {type: Date, required: true},
    publisher: {type: String, required: true},
    isActive: { type: Boolean, required: true, default: true }
  }, {
    versionKey: false,
    timestamps: true
});
  
const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;

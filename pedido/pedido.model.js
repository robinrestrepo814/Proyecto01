const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    date: {type: Date, required: true},
    status: {type: String, required: true},
    bookList: {type: [String], required: true},
    requesterId: {type: String, required: true, default: " "},
    receiverId: {type: String, required: true, default: " "},
    isActive: { type: Boolean, required: true, default: true }
  }, {
    versionKey: false,
    timestamps: true
});
  
const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;

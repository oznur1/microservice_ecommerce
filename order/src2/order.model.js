const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const  orderSchema= new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);



// client'a cevap göndermden önce hassas verileri gizle
orderSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

// model oluştur
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
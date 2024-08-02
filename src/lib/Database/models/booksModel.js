const mongoose = require("mongoose");
const crypto = require("crypto");
const orderschema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
// orderschema.pre("save", function (next) {
//   if (this.isNew) {
//     this.orderID = generateHash();
//   }
//   next();
// });

module.exports =
  mongoose.models.booksmodel || mongoose.model("booksmodel", orderschema);

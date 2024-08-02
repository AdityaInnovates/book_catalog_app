import mongoose from "mongoose";

const productschema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: Array,
    required: true,
  },
  wishlist: {
    type: Array,
    required: false,
    default: [],
  },
});

export default mongoose?.models?.users ||
  mongoose.model("users", productschema);

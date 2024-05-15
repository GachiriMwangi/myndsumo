import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    checkbox: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("data", userSchema);
export default Book;

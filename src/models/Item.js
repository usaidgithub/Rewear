// models/Item.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
      enum: ["New", "Gently Used", "Used", "Heavily Used"],
    },
    imageUrl: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    swapStatus: {
      type: String,
      enum: ["Available", "Requested", "Swapped"],
      default: "Available",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Item || mongoose.model("Item", itemSchema);

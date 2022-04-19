import mongoose from "mongoose";
import shortid from "shortid";

const { Schema, model } = mongoose;

const pollSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  layout: {
    type: [{ question: String, variants: [String] }],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isOpened: {
    type: Boolean,
    default: true,
  },
  link: {
    type: String,
    default: shortid.generate,
  },
});

export default model("Poll", pollSchema);

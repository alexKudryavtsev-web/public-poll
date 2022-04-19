import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ReplySchema = new Schema({
  pollId: {
    type: Schema.Types.ObjectId,
    ref: "Poll",
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  reply: {
    type: Map,
    of: String,
  },
});

export default model("Reply", ReplySchema);

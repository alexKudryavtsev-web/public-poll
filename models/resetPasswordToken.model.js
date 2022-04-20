import mongoose from "mongoose";

const { Schema, model } = mongoose;

const resetPasswordTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  resetPasswordToken: {
    type: String,
    required: true,
  },
});

export default model("ResetPasswordToken", resetPasswordTokenSchema);

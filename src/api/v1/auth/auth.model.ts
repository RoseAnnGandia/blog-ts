import { model, Schema } from "mongoose";

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  deviceId: { type: String, required: true },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: () => {
      const now = new Date();
      now.setDate(now.getDate() + 1);
      now.setHours(now.getHours() + 8);
      return now;
    },
  },
});

export const TokenModel = model("Token", tokenSchema);

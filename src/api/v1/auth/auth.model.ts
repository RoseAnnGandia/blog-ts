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
      now.setDate(now.getDate() + 1); // expiration in 1 day
      now.setHours(now.getHours() + 8); // adjust for timezone (e.g., UTC+8)
      return now;
    },
  },
});

// an index on `expiresAt` field for TTL functionality
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const TokenModel = model("Token", tokenSchema);

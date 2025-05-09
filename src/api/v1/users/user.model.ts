import { InferSchemaType, model, Schema, Document } from "mongoose";

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

export type UserType = InferSchemaType<typeof userSchema>;
export type UserDoc = Document & UserType;
export const UserModel = model<UserType>("User", userSchema);

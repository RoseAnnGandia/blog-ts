import { createError } from "@utils/custom-error";
import { UserDoc, UserModel, UserType } from "./user.model";
import { CreateUserInput, UpdateUserInput } from "./user.types";
import { Types } from "mongoose";

export class UserService {
  constructor(private userModel: typeof UserModel) {
    this.userModel = userModel;
  }

  async getAllUsers(): Promise<UserType[]> {
    const users = await this.userModel.find();

    return users;
  }

  async getUserById(id: string | Types.ObjectId): Promise<UserType> {
    const user = await this.userModel.findById(id);

    if (!user) throw createError.notFound("User not found");

    return user;
  }

  async getUserByEmail(email: string): Promise<UserDoc> {
    const user = await this.userModel.findOne({ email });

    if (!user) throw createError.notFound("User not found");

    const userDetails = user as UserDoc;

    return userDetails;
  }

  async createUser(userInput: CreateUserInput): Promise<UserType> {
    const newUser = new this.userModel(userInput);

    return newUser.save();
  }

  async updateUser(
    id: string | Types.ObjectId,
    userInput: UpdateUserInput
  ): Promise<UserType> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, userInput, {
        new: true,
      })
      .lean();

    if (!updatedUser) throw createError.notFound("User not found");

    return updatedUser;
  }

  async deleteUser(id: string | Types.ObjectId): Promise<{ message: string }> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);

    if (!deletedUser) throw createError.notFound("User not found");

    return {
      message: "User deleted successfully",
    };
  }

  async isEmailRegistered(email: string): Promise<Boolean> {
    const user = await this.userModel.findOne({ email });

    if (user) throw createError.conflict("Email already registered");

    return false;
  }

  async changePassword(userId: string, hashedPassword: string) {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, {
      password: hashedPassword,
    });

    return updatedUser;
  }
}

export const userService = new UserService(UserModel);

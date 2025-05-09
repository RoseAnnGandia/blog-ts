import { UserType } from "../users/user.model";
import { TokenModel } from "./auth.model";
import { CreateUserInput } from "../users/user.types";
import { createError } from "@utils/custom-error";
import { userService } from "../users/user.service";
import bcrypt from "bcrypt";
import {
  AuthTokens,
  ChangePassInput,
  SigninInput,
  SignoutInput,
  TokenPayload,
} from "./auth.types";
import { TokenService } from "./token.service";

export class AuthService {
  private SALT_ROUNDS = 10;

  constructor(private tokenModel: typeof TokenModel) {
    this.tokenModel = tokenModel;
  }

  async signup(userInput: CreateUserInput): Promise<UserType> {
    const { password, email } = userInput;

    await userService.isEmailRegistered(email);

    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);
    const userDetails = {
      ...userInput,
      password: hashedPassword,
    };

    return await userService.createUser(userDetails);
  }

  async signin(signinInput: SigninInput): Promise<AuthTokens> {
    const { email, password, deviceId } = signinInput;
    const user = await userService.getUserByEmail(email);
    const userId = user?._id?.toString() || "";

    await this.validatePassword(user?.password as string, password);

    const accessToken = TokenService.generateAccessToken(userId);
    const refreshToken = TokenService.generateRefreshToken(userId);

    const hashedRefreshToken = await TokenService.hashToken(refreshToken);

    await TokenModel.create({
      userId: user._id,
      token: hashedRefreshToken,
      deviceId,
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(token: string, deviceId: string) {
    const decodedToken = TokenService.verifyRefreshToken(token);
    const tokenUserId = (decodedToken as TokenPayload)?.userId;
    const storedToken = await this.tokenModel.findOne({
      userId: tokenUserId,
      deviceId,
    });

    if (!storedToken) throw createError.forbidden("Invalid refresh token");

    await TokenService.verifyHashedToken(token, storedToken?.token || "");

    const accessToken = TokenService.generateAccessToken(tokenUserId);
    const newRefreshToken = TokenService.generateRefreshToken(tokenUserId);
    const hashedRefreshToken = await TokenService.hashToken(newRefreshToken);
    await this.tokenModel.findOneAndUpdate(
      { userId: tokenUserId, deviceId },
      { token: hashedRefreshToken },
      { upsert: true }
    );

    return { accessToken, refreshToken: newRefreshToken };
  }

  async signout(signoutInput: SignoutInput) {
    const { refreshToken, deviceId } = signoutInput;
    const decoded = TokenService.verifyRefreshToken(refreshToken);

    const signedOutUser = await this.tokenModel.findOneAndDelete({
      userId: decoded.userId,
      deviceId: deviceId,
    });

    if (!signedOutUser)
      throw createError.notFound("User not found or already signed out");

    return signedOutUser;
  }

  async changePassword(changePassInput: ChangePassInput) {
    const { oldPassword, newPassword, userId } = changePassInput;
    let user = await userService.getUserById(userId);

    await this.validatePassword(user?.password as string, oldPassword);

    const hashedPassword = await bcrypt.hash(newPassword, this.SALT_ROUNDS);

    await userService.changePassword(userId, hashedPassword);

    return await this.deleteRefreshTokens(userId);
  }

  async validatePassword(dbPassword: string, inputPassword: string) {
    const isPasswordMatch = await bcrypt.compare(inputPassword, dbPassword);

    if (!isPasswordMatch) throw createError.unauthorized("Invalid credentials");

    return isPasswordMatch;
  }

  async deleteRefreshTokens(userId: string): Promise<void> {
    await this.tokenModel.deleteMany({ userId });
  }
}

export const authService = new AuthService(TokenModel);

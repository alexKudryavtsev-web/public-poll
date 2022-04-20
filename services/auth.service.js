import bcrypt from "bcryptjs";
import config from "config";
import { v4 } from "uuid";

import UserDto from "../dto/user.dto.js";
import ApiError from "../exceptions/api.error.js";
import RefreshTokenModel from "../models/refreshToken.model.js";
import ResetPasswordTokenModel from "../models/resetPasswordToken.model.js";
import UserModel from "../models/user.model.js";
import EmailService from "./email.service.js";
import TokenService from "./token.service.js";

class AuthService {
  async registration(email, firstname, lastname, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(`Email ${email} is busy`);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const activationUserLink = v4();

    const user = new UserModel({
      email,
      firstname,
      lastname,
      password: hashPassword,
      activationUserLink,
    });

    await user.save();

    EmailService.sendActivationUserMail(
      email,
      firstname,
      `${config.get("API_URL")}/auth/activateUser/${activationUserLink}`
    );

    const userDto = new UserDto(user);

    return { user: userDto };
  }

  async resetActivationUserMail(email) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest(`User with email ${email} does not exist`);
    }

    const activationUserLink = v4();
    user.activationUserLink = activationUserLink;

    await user.save();

    EmailService.sendActivationUserMail(
      email,
      user.firstname,
      `${config.get("API_URL")}/auth/activateUser/${activationUserLink}`
    );

    const userDto = new UserDto(user);

    return { user: userDto };
  }

  async activateUser(link) {
    const user = await UserModel.findOne({ activationUserLink: link });
    if (!user) {
      throw ApiError.BadRequest("wrong link");
    }

    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest(`User with ${email} email not found`);
    }

    const comparedPassword = await bcrypt.compare(password, user.password);

    if (!comparedPassword) {
      throw ApiError.BadRequest("wrong password");
    }

    const userDto = new UserDto(user);

    const tokens = await TokenService.generateTokens({ ...userDto });

    await TokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return {
      user: userDto,
      ...tokens,
    };
  }

  async logout(refreshToken) {
    await TokenService.removeRefreshToken(refreshToken);
  }

  async refresh(refreshToken) {
    const dataFromToken = await TokenService.verifyRefreshToken(refreshToken);
    const dataFromDB = await RefreshTokenModel.findOne({ refreshToken });

    if (!dataFromToken || !dataFromDB) {
      throw ApiError.BadRequest("invalid refresh token");
    }

    const user = await UserModel.findById(dataFromDB.userId);
    const userDto = new UserDto(user);

    const newAccessToken = await TokenService.generateAccessToken({
      ...userDto,
    });

    return newAccessToken;
  }

  async resetPassword(email) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest(`User with ${email} email not found`);
    }

    const activationResetPasswordLink = v4();
    user.activationResetPasswordLink = activationResetPasswordLink;

    await user.save();

    const userDto = new UserDto(user);

    const resetPasswordToken = await TokenService.generateResetPasswordToken({
      ...userDto,
    });

    await TokenService.saveResetPasswordToken(userDto.id, resetPasswordToken);

    EmailService.sendActivationResetPasswordMail(
      email,
      user.firstname,
      `${config.get(
        "API_URL"
      )}/activateResetPassword/${activationResetPasswordLink}`
    );

    await RefreshTokenModel.deleteOne({ userId: user._id });

    return userDto;
  }

  async activateResetPassword(newPassword, activationResetPasswordLink) {
    const user = await UserModel.findOne({ activationResetPasswordLink });

    if (!user) {
      throw ApiError.BadRequest(`wrong activation reset password link`);
    }

    const tokenFromDB = await ResetPasswordTokenModel.findOne({
      userId: user._id,
    });

    const dataFromToken = await TokenService.verifyResetPasswordToken(
      tokenFromDB.resetPasswordToken
    );

    if (!dataFromToken) {
      throw ApiError.BadRequest(`token not found or expired (1h valid)`);
    }

    const hashPassword = await bcrypt.hash(newPassword, 3);
    user.password = hashPassword;
    user.activationResetPasswordLink = "";

    await user.save();

    const userDto = new UserDto(user);

    await ResetPasswordTokenModel.deleteOne({ _id: tokenFromDB._id });

    return userDto;
  }
}

export default new AuthService();

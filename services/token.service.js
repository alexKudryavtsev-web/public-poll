import config from "config";
import jwt from "jsonwebtoken";

import RefreshTokenModel from "../models/refreshToken.model.js";
import ResetPasswordTokenModel from "../models/resetPasswordToken.model.js";

const ACCESS_TOKEN_OPTIONS = {
  expiresIn: "1h",
};

const REFRESH_TOKEN_OPTIONS = {
  expiresIn: "30d",
};

const RESET_PASSWORD_TOKEN_OPTIONS = { expiresIn: "1h" };

class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(
      payload,
      config.get("ACCESS_SECRET"),
      ACCESS_TOKEN_OPTIONS
    );
    const refreshToken = jwt.sign(
      payload,
      config.get("REFRESH_SECRET"),
      REFRESH_TOKEN_OPTIONS
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateAccessToken(payload) {
    return jwt.sign(payload, config.get("ACCESS_SECRET"), ACCESS_TOKEN_OPTIONS);
  }

  async saveRefreshToken(userId, refreshToken) {
    const candidate = await RefreshTokenModel.findOne({ userId });

    if (candidate) {
      candidate.refreshToken = refreshToken;
      return await candidate.save();
    }

    const newRefreshTokenInDB = new RefreshTokenModel({
      userId,
      refreshToken,
    });

    return await newRefreshTokenInDB.save();
  }

  async verifyRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get("REFRESH_SECRET"));
    } catch (e) {
      return null;
    }
  }

  async verifyAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, config.get("ACCESS_SECRET"));
    } catch (e) {
      return null;
    }
  }

  async removeRefreshToken(refreshToken) {
    await RefreshTokenModel.deleteOne({ refreshToken });
  }

  async generateResetPasswordToken(payload) {
    const resetPasswordToken = jwt.sign(
      payload,
      config.get("RESET_PASSWORD_SECRET"),
      RESET_PASSWORD_TOKEN_OPTIONS
    );

    return resetPasswordToken;
  }

  async saveResetPasswordToken(userId, resetPasswordToken) {
    const candidate = await ResetPasswordTokenModel.findOne({ userId });

    if (candidate) {
      candidate.resetPasswordToken = resetPasswordToken;
      await candidate.save();

      return candidate;
    }

    const newTokenInDB = await ResetPasswordTokenModel.create({
      userId,
      resetPasswordToken,
    });
    return newTokenInDB;
  }

  async verifyResetPasswordToken(resetPasswordToken) {
    try {
      const payload = jwt.verify(
        resetPasswordToken,
        config.get("RESET_PASSWORD_SECRET")
      );

      return payload;
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();

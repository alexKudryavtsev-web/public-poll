import config from "config";
import jwt from "jsonwebtoken";

import RefreshTokenModel from "../models/refreshToken.model.js";

class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, config.get("ACCESS_SECRET"), {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, config.get("REFRESH_SECRET"), {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateAccessToken(payload) {
    return jwt.sign(payload, config.get("ACCESS_SECRET"), {
      expiresIn: "1h",
    });
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
}

export default new TokenService();

import config from "config";
import { validationResult } from "express-validator";

import ApiError from "../exceptions/api.error.js";
import AuthService from "../services/auth.service.js";

const cookiesConfig = {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  httpOnly: true,
};

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw ApiError.BadRequest("wrong form");
      }

      const { email, firstname, lastname, password } = req.body;

      const userData = await AuthService.registration(
        email,
        firstname,
        lastname,
        password
      );

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async resetActivationUserMail(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw ApiError.BadRequest("wrong form");
      }

      const { email } = req.body;

      const userData = await AuthService.resetActivationUserMail(email);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async activateUser(req, res, next) {
    try {
      const { link } = req.params;

      await AuthService.activateUser(link);

      return res.redirect(config.get("CLIENT_URL"));
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw ApiError.BadRequest("wrong form");
      }

      const { email, password } = req.body;

      const userData = await AuthService.login(email, password);
      res.cookie("token", userData.refreshToken, cookiesConfig);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { token: refreshToken } = req.cookies;

      await AuthService.logout(refreshToken);

      res.clearCookie("token");

      return res.status(202).json({ message: "user logout" });
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { token: refreshToken } = req.cookies;

      const userData = await AuthService.refresh(refreshToken);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw ApiError.BadRequest("wrong form");
      }

      const { email } = req.body;

      const userData = await AuthService.resetPassword(email);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async activateResetPassword(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw ApiError.BadRequest("wrong form");
      }

      const { newPassword, activationResetPasswordLink } = req.body;

      const userData = await AuthService.activateResetPassword(
        newPassword,
        activationResetPasswordLink
      );

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();

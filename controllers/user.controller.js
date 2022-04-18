import config from "config";
import { validationResult } from "express-validator";

import ApiError from "../exceptions/api.error.js";
import AuthService from "../services/auth.service.js";

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
}

export default new UserController();

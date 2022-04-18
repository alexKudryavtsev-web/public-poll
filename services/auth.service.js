import bcrypt from "bcryptjs";
import config from "config";
import { v4 } from "uuid";

import UserDto from "../dto/user.dto.js";
import ApiError from "../exceptions/api.error.js";
import UserModel from "../models/user.model.js";
import EmailService from "./email.service.js";

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
}

export default new AuthService();

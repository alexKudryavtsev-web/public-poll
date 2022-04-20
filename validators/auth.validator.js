import { check } from "express-validator";

export const registrationValidator = [
  check("email", "wrong email").isEmail(),
  check("password", "wrong password").isLength({ min: 6 }),
  check("firstname", "wrong firstname").notEmpty().isString(),
  check("lastname", "wrong lastname").notEmpty().isString(),
];

export const resetActivationUserMailValidator = [
  check("email", "wrong email").isEmail(),
];

export const loginValidator = [
  check("email", "wrong email").isEmail(),
  check("password", "wrong password").notEmpty().isString(),
];

export const resetPasswordValidator = [check("email", "wrong email").isEmail()];

export const activateResetPasswordValidator = [
  check("newPassword").isLength({ min: 6 }),
  check("activationResetPasswordLink").notEmpty().isString(),
];

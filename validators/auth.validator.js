import { check } from "express-validator";

export const registrationValidator = [
  check("email", "wrong email").isEmail(),
  check("password", "wrong password").isLength({ min: 6 }),
  check("firstname", "wrong firstname").notEmpty().isString(),
  check("lastname", "wrong lastname").notEmpty().isString(),
];

export const resetActivationUserMail = [
  check("email", "wrong email").isEmail(),
];

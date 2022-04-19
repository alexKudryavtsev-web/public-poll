import { check } from "express-validator";

export const createReplyValidator = [
  check("email").isEmail(),
  check("pollId").isString(),
  check("reply")
    .isObject()
    .custom((value) => Object.keys(value).length !== 0),
];

export const readRepliesValidator = [
  check("pollId", "wrong pull id").notEmpty().isString(),
];

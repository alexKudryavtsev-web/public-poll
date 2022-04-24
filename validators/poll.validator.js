import { check } from "express-validator";

export const createPollValidator = [
  check("layout", "wrong layout")
    .isArray()
    .custom((value) => value.length >= 1),
  check("layout.*.question", "wrong layout").notEmpty().isString(),
  check("layout.*.variants", "wrong layout")
    .notEmpty()
    .isArray()
    .custom((input) => input.length >= 2),
  check("title").notEmpty().isString(),
];

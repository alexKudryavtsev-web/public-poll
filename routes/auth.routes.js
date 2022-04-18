import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import {
  registrationValidator,
  resetActivationUserMail,
} from "../validators/auth.validator.js";

const authRouter = new Router();

authRouter.post(
  "/registration",
  registrationValidator,
  UserController.registration
);
authRouter.get("/activateUser/:link", UserController.activateUser);
authRouter.post(
  "/resetActivationUserMail",
  [resetActivationUserMail],
  UserController.resetActivationUserMail
);

authRouter.post("/login", (req, res) => res.json("HkpkojojE"));
authRouter.post("/logout", (req, res) => res.json("HEdsfsdf"));
authRouter.get("/refresh", (req, res) => res.json("HdfsfdE"));

authRouter.post("/resetPassword", (req, res) => res.json("HEsfevbbcbxv"));
authRouter.post("/activateResetPassword", (req, res) => res.json("vcvcvcvxHE"));

export default authRouter;

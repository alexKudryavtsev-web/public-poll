import { Router } from "express";

import UserController from "../controllers/user.controller.js";
import {
  setNewPasswordValidator,
  loginValidator,
  registrationValidator,
  resetActivationUserMailValidator,
  resetPasswordValidator,
} from "../validators/auth.validator.js";

const authRouter = new Router();

authRouter.post(
  "/registration",
  registrationValidator,
  UserController.registration
);
authRouter.get("/activate-user/:link", UserController.activateUser);
authRouter.post(
  "/reset-activation-user-mail",
  resetActivationUserMailValidator,
  UserController.resetActivationUserMail
);

authRouter.post("/login", loginValidator, UserController.login);
authRouter.post("/logout", UserController.logout);
authRouter.get("/refresh", UserController.refresh);

authRouter.post(
  "/reset-password",
  resetPasswordValidator,
  UserController.resetPassword
);
authRouter.post(
  "/set-new-password",
  setNewPasswordValidator,
  UserController.setNewPassword
);

export default authRouter;

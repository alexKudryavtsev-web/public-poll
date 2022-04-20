import { Router } from "express";

import UserController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  activateResetPasswordValidator,
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
authRouter.get("/activateUser/:link", UserController.activateUser);
authRouter.post(
  "/resetActivationUserMail",
  resetActivationUserMailValidator,
  UserController.resetActivationUserMail
);

authRouter.post("/login", loginValidator, UserController.login);
authRouter.post("/logout", UserController.logout);
authRouter.get("/refresh", UserController.refresh);
authRouter.post("/test", authMiddleware, (req, res) => res.json(req.user));

authRouter.post(
  "/resetPassword",
  resetPasswordValidator,
  UserController.resetPassword
);
authRouter.post(
  "/activateResetPassword",
  activateResetPasswordValidator,
  UserController.activateResetPassword
);

export default authRouter;

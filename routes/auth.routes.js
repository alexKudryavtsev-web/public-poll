import { Router } from "express";

import UserController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  loginValidator,
  registrationValidator,
  resetActivationUserMailValidator,
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

authRouter.post("/resetPassword", (req, res) => res.json("HEsfevbbcbxv"));
authRouter.post("/activateResetPassword", (req, res) => res.json("vcvcvcvxHE"));

export default authRouter;

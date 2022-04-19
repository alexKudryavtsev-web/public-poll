import { Router } from "express";
import RedirectController from "../controllers/redirect.controller.js";

const redirectRouter = new Router();

redirectRouter.get("/:code", RedirectController.redirectToPoll);

export default redirectRouter;

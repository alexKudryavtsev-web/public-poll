import { Router } from "express";

import ReplyController from "../controllers/reply.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { createReplyValidator } from "../validators/reply.validator.js";

const replyRouter = new Router();

replyRouter.post(
  "/create-reply",
  createReplyValidator,
  ReplyController.createReply
);

replyRouter.get(
  "/read-replies/:id",
  authMiddleware,
  ReplyController.readReplies
);

export default replyRouter;

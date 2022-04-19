import { Router } from "express";

import ReplyController from "../controllers/reply.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createReplyValidator,
  readRepliesValidator,
} from "../validators/reply.validator.js";

const replyRouter = new Router();

replyRouter.post(
  "/createReply",
  createReplyValidator,
  ReplyController.createReply
);

replyRouter.get(
  "/readReplies",
  authMiddleware,
  ...readRepliesValidator,
  ReplyController.readReplies
);

export default replyRouter;

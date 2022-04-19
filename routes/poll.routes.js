import { Router } from "express";

import pollController from "../controllers/poll.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  closePollValidator,
  createPollValidator,
} from "../validators/poll.validator.js";

const pollRouter = new Router();
pollRouter.post(
  "/createPoll",
  authMiddleware,
  ...createPollValidator,
  pollController.createPoll
);
pollRouter.post(
  "/closePoll",
  authMiddleware,
  ...closePollValidator,
  pollController.closePoll
);
pollRouter.get("/readPolls", authMiddleware, pollController.readPolls);
pollRouter.get(
  "/pollDetails/:id",
  authMiddleware,
  pollController.readPollDetails
);

export default pollRouter;

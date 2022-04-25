import { Router } from "express";

import pollController from "../controllers/poll.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { createPollValidator } from "../validators/poll.validator.js";

const pollRouter = new Router();
pollRouter.post(
  "/create-poll",
  authMiddleware,
  ...createPollValidator,
  pollController.createPoll
);
pollRouter.post("/close-poll/:id", authMiddleware, pollController.closePoll);
pollRouter.get("/read-polls", authMiddleware, pollController.readPolls);
pollRouter.get("/poll-details/:id", pollController.readPollDetails);
pollRouter.get(
  "/poll-details-by-code/:code",
  pollController.readPollDetailsByCode
);

export default pollRouter;

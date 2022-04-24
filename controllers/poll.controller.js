import { validationResult } from "express-validator";

import ApiError from "../exceptions/api.error.js";
import PollService from "../services/poll.service.js";

class LayoutController {
  async createPoll(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw ApiError.BadRequest("wrong form");
      }

      const { title, layout } = req.body;
      const { userId } = req.user;

      const pollData = await PollService.createPoll(userId, title, layout);

      res.json(pollData);
    } catch (e) {
      next(e);
    }
  }

  async closePoll(req, res, next) {
    try {
      const { id } = req.params;

      const pollData = await PollService.closePoll(id);

      return res.json(pollData);
    } catch (e) {
      next(e);
    }
  }

  async readPolls(req, res, next) {
    try {
      const { userId } = req.user;

      const pollsData = await PollService.readPolls(userId);

      return res.json(pollsData);
    } catch (e) {
      next(e);
    }
  }

  async readPollDetails(req, res, next) {
    try {
      const { id } = req.params;

      const pollData = await PollService.readPollDetail(id);

      return res.json(pollData);
    } catch (e) {
      next(e);
    }
  }
}

export default new LayoutController();

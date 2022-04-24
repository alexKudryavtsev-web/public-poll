import { validationResult } from "express-validator";

import ApiError from "../exceptions/api.error.js";
import ReplyService from "../services/reply.service.js";

class ReplyController {
  async createReply(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw ApiError.BadRequest("wrong form");
      }

      const { email, pollId, reply } = req.body;

      const replyData = await ReplyService.createReply(email, pollId, reply);

      res.json(replyData);
    } catch (e) {
      next(e);
    }
  }

  async readReplies(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw ApiError.BadRequest("wrong form");
      }

      const { id } = req.params;
      const { userId } = req.user;

      const repliesData = await ReplyService.readReplies(userId, pollId);

      return res.json(repliesData);
    } catch (e) {
      next(e);
    }
  }
}
export default new ReplyController();

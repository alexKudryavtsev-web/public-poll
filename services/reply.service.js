import ApiError from "../exceptions/api.error.js";
import ReplyModel from "../models/reply.model.js";
import PollModel from "../models/poll.model.js";
import ReplyDto from "../dto/reply.dto.js";

class ReplyService {
  async createReply(email, pollId, reply) {
    const poll = await PollModel.findById(pollId);

    if (!poll) {
      throw ApiError.BadRequest("poll not found");
    } else if (!poll.isOpened) {
      throw ApiError.BadRequest("poll closed");
    }

    const candidate = await ReplyModel.findOne({ email, pollId });
    if (candidate) {
      throw ApiError.BadRequest(
        `The person with ${email} email has already answered this poll`
      );
    }

    if (poll.layout.length !== Object.keys(reply).length) {
      throw ApiError.BadRequest("not all questions answered");
    }

    for (let [questionId, selectedVariant] of Object.entries(reply)) {
      const element = poll.layout.find(
        (element) => element._id.toString() === questionId
      );

      if (!element) {
        throw ApiError.BadRequest("question not found");
      }

      if (!element.variants.includes(selectedVariant)) {
        throw ApiError.BadRequest("impossible answer");
      }
    }

    const newReply = new ReplyModel({
      email,
      pollId,
      reply,
    });

    await newReply.save();

    const newReplyDto = new ReplyDto(newReply, poll);

    return newReplyDto;
  }

  async readReplies(userId, pollId) {
    const poll = await PollModel.findById(pollId);

    if (!poll) {
      throw ApiError.BadRequest("poll not found");
    }

    if (poll.userId.toString() !== userId) {
      throw ApiError.BadRequest("it's not your data");
    }

    const replies = await ReplyModel.find({ pollId: poll._id });

    const repliesDto = replies.map((reply) => new ReplyDto(reply, poll));

    return {
      title: poll.title,
      pollId: poll._id,
      replies: repliesDto,
    };
  }
}

export default new ReplyService();

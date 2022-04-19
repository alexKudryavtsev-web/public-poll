import PollDto from "../dto/poll.dto.js";
import ApiError from "../exceptions/api.error.js";
import PollModel from "../models/poll.model.js";

class LayoutSevice {
  async createPoll(userId, title, layout) {
    const poll = new PollModel({ userId, title, layout });

    await poll.save();

    const pollDto = new PollDto(poll);
    return pollDto;
  }

  async closePoll(pollId) {
    const poll = await PollModel.findById(pollId);
    poll.isOpened = false;

    await poll.save();

    const pollDto = new PollDto(poll);

    return pollDto;
  }

  async readPolls(userId) {
    const polls = await PollModel.find({ userId });
    const pollsDto = polls.map((poll) => new PollDto(poll));

    return pollsDto;
  }

  async readPollDetail(pollId) {
    const poll = await PollModel.findById(pollId);
    if (!poll) {
      throw ApiError.BadRequest(`poll with id ${pollId} is not exists`);
    }
    const pollDto = new PollDto(poll);
    return pollDto;
  }
}

export default new LayoutSevice();

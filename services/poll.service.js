import config from "config";
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

  async visitePoll(code) {
    const poll = await PollModel.findOne({ code });
    if (!poll) {
      throw ApiError.BadRequest(`wrong link`);
    }

    poll.visitedCount++;
    await poll.save();

    const linkInClient = `${config.get("CLIENT_URL")}/polls/${code}`;
    return linkInClient;
  }
}

export default new LayoutSevice();

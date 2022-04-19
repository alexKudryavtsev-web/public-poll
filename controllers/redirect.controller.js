import PollService from "../services/poll.service.js";

class RedirectController {
  async redirectToPoll(req, res, next) {
    try {
      const { code } = req.params;

      const link = await PollService.visitePoll(code);

      return res.redirect(link);
    } catch (e) {
      next(e);
    }
  }
}

export default new RedirectController();

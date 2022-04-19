class ReplyDto {
  id;
  email;
  pollId;
  reply;
  date;

  constructor(replyModel, pollModel) {
    this.id = replyModel._id;
    this.email = replyModel.email;
    this.date = replyModel.date;
    this.reply = Object.fromEntries(
      pollModel.layout.map((element) => [
        element.question,
        replyModel.reply.get(element._id),
      ])
    );
  }
}

export default ReplyDto;

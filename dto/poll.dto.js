import config from "config";

class PollDto {
  id;
  userId;
  layout;
  date;
  isOpened;
  visitedCount;

  constructor(model) {
    this.id = model._id;
    this.userId = model.userId;
    this.layout = model.layout.map((element) => ({
      question: element.question,
      variants: element.variants,
      id: element._id,
    }));
    this.date = model.date;
    this.isOpened = model.isOpened;
    this.visitedCount = model.visitedCount;
    this.link = `${config.get("REDIRECT_URL")}/${model.code}`;
  }
}

export default PollDto;

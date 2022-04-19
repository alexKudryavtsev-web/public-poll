import config from "config";

class PollDto {
  id;
  userId;
  layout;
  date;
  isOpened;

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
    this.link = `${config.get("API_URL")}/t/${model.link}`;
  }
}

export default PollDto;

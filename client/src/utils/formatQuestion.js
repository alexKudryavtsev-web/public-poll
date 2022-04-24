function formatQuestion(question) {
  return question.endsWith("?") ? question : `${question}?`;
}

export default formatQuestion;

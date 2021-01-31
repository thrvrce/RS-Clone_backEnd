type TopicQuestionType = {
  price: number,
  question: string,
  answers: string,
}
export type TopicType = {
  topicName: string;
  topicQuestions: TopicQuestionType[],
}
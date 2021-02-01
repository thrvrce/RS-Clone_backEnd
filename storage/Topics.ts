import { topicsCollection } from './Collections';
import { TopicType } from '../types/Topics';

async function findTopicByName(topicName: string) {
  const collection = await topicsCollection;
  const topic = await collection.findOne({ topicName });
  return topic;
}

async function inserArrayOfTopics(topics: TopicType[]) {
  const insertedTopics: string[] = [];
  const rejectedTopics: string[] = [];

  await Promise.all(topics.map(async (topic) => {
    const storedTopic = await findTopicByName(topic.topicName);

    if (storedTopic) {
      rejectedTopics.push(topic.topicName);
    } else {
      const collection = await topicsCollection;
      await collection.insertOne(topic);
      insertedTopics.push(topic.topicName);
    }
  }));

  return { insertedTopics, rejectedTopics };
}

async function getAllTopics() {
  const collection = await topicsCollection;
  const Topics: any[] = [];
  await collection.find().forEach((topic) => Topics.push(topic));
  return Topics;
}

async function deleteTopicByName(topicName: string) {
  const collection = await topicsCollection;
  const deleteInfo = await collection.deleteOne({ topicName });
  return deleteInfo;
}

export {
  inserArrayOfTopics,
  findTopicByName,
  getAllTopics,
  deleteTopicByName,
};

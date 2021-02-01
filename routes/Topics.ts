import { Router } from 'express';
import {
  inserArrayOfTopics, findTopicByName, getAllTopics, deleteTopicByName,
} from '../storage/Topics';

const router = Router();

router.post('/posttopics', async (req, res, next) => {
  const { insertedTopics, rejectedTopics } = await inserArrayOfTopics(req.body);
  res.json({ insertedTopics, rejectedTopics });
});

router.get('/gettopicbyname/:topicName', async (req, res, next) => {
  const topic = await findTopicByName(req.params.topicName);
  res.json({ topic });
});

router.get('/getalltopics', async (req, res, next) => {
  const topics = await getAllTopics();
  res.json(topics);
});

router.delete('/deletetopicbyname/:topicName', async (req, res, next) => {
  const { deletedCount } = await deleteTopicByName(req.params.topicName);
  res.json(deletedCount);
});

export default router;

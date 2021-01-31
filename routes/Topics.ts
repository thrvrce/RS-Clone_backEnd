import { Router } from 'express';
import { inserArrayOfTopics, findTopicByName, getAllTopics } from '../storage/Topics';

const router = Router();

router.post('/posttopics', async (req, res, next) => {
  const { insertedTopics, rejectedTopics } = await inserArrayOfTopics(req.body);
  res.json({ insertedTopics, rejectedTopics });
});

router.get('/gettopicbyname/:id', async (req, res, next) => {
  const topic = await findTopicByName(req.params.id);
  res.json({ topic });
});

router.get('/getalltopics', async (req, res, next) => {
  const topics = await getAllTopics();
  res.json(topics);
});
export default router;

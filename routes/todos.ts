import { Router } from 'express';
import * as storageFuncs from '../storage/mongo';

const router = Router();

router.get('/', async (req, res, next) => {
  const list = await storageFuncs.listAll();
  res.json(list);
});

router.get('/:id', async (req, res, next) => {
  const item = await storageFuncs.getById(req.params.id);
  res
    .status(item ? 200 : 404)
    .json(item);
});

router.post('/', async (req, res, next) => {
  const createtArr = await storageFuncs.create(req.body);
  return res.json(createtArr);
});

router.put('/:id', async (req, res, next) => {
  const newBody = await storageFuncs.update(req.body);
  res.json(newBody);
});

router.delete('/:id', async (req, res, next) => {
  const newBody = await storageFuncs.remove(req.params.id);
  res.json(newBody);
});

export default router;

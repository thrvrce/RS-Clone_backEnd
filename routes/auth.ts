import { Router } from 'express';
import {register, checkSession } from '../storage/Authorization';
//import path from 'path'
// const __dirname = path.resolve();

const router = Router();

// router.get('/', async (req, res, next) => {
//   console.log(`req: ${req}`);
//   res.json(req.body);
  // res.sendFile(path.resolve(__dirname, '../view', 'login.html'));
// });

router.post('/register', async (req, res, next) => {
  const { status, token } = await register(req.body);

  res.json({ status, token });
});

router.put('/checkSession', async (req, res, next) => {
  console.log(req.body);
  const { status, user } = await checkSession(req.body.token);

  res.json({ status, user });
});
// router.get('/:id', async (req, res, next) => {
//   const item = await storageFuncs.getById(req.params.id);
//   res
//     .status(item ? 200 : 404)
//     .json(item);
// });

// router.post('/', async (req, res, next) => {
//   const createtArr = await storageFuncs.create(req.body);
//   return res.json(createtArr);
// });

// router.put('/:id', async (req, res, next) => {
//   const newBody = await storageFuncs.update(req.body);
//   res.json(newBody);
// });

// router.delete('/:id', async (req, res, next) => {
//   const newBody = await storageFuncs.remove(req.params.id);
//   res.json(newBody);
// });

export default router;

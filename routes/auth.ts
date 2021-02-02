import { Router } from 'express';
import {
  register, checkSession, userLogin, logOut, updateUser,
} from '../storage/Authorization';

// import path from 'path'
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
  const { status, user } = await checkSession(req.body.token);
  res.json({ status, user });
});

router.put('/authorize', async (req, res, next) => {
  const { status, token } = await userLogin(req.body);
  res.json({ status, token });
});

router.delete('/logout', async (req, res, next) => {
  const status = await logOut(req.body.login);
  res.json({ status });
});

router.put('/updateUser/', async (req, res, next) => {
  console.log(req.body.field, req.body.updateValue, req.body.token);
  const status = await updateUser(req.body.field, req.body.updateValue, req.body.token);
  res
    .status(status ? 200 : 501)
    .json({ status });
});
// router.get('/:id', async (req, res, next) => {
//   const item = await storageFuncs.getById(req.params.id);
//   res
//     .status(item ? 200 : 404)
//     .json(item);
// });
export default router;

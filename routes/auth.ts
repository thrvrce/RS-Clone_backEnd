import { Router } from 'express';
import {
  register, checkSession, userLogin, logOut, updateUser,
} from '../storage/Authorization';

const router = Router();

router.post('/register', async (req, res, next) => {
  const { status, token, user } = await register(req.body);
  res
    .status(status ? 200 : 403)
    .json(status ? { status, token, user } : { message: 'Регистрация не осуществлена. Пользователь с такими данными уже существует' });
});

router.put('/checkSession', async (req, res, next) => {
  const { status, user } = await checkSession(req.body.token);
  res
    .status(status ? 200 : 401)
    .json(status ? { status, user } : { message: 'Сессия не прошла валидацию по прчине отсутствия пользователя или истечения срока ее действия.' });
});

router.put('/authorize', async (req, res, next) => {
  const { status, token, user } = await userLogin(req.body);
  res
    .status(status ? 200 : 401)
    .json(status ? { status, token, user } : { message: 'Пользватель с введенными данными не найден' });
});

router.delete('/logout', async (req, res, next) => {
  const status = await logOut(req.body.login);
  res
    .status(200)
    .json({ status });
});

router.put('/updateUser', async (req, res, next) => {
  const {
    status,
    autorized,
    updated,
    user,
  } = await updateUser(req.body.field, req.body.updateValue, req.body.token);

  res
    // eslint-disable-next-line no-nested-ternary
    .status(status ? 200 : (autorized ? 500 : 401))
    .json(status ? { status, autorized, updated, user } : { message: autorized ? 'Обновление не выполнено.' : 'Сессия не прошла валидацию по причине отсутствия пользователя или истечения срока действия.' });
});

export default router;

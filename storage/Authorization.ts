import md5 from 'md5';
import { Collection } from 'mongodb';
import { usersCollection, sessionsCollection } from './Collections';
import { UserRegisterType } from '../types/Users';

const PASSWORD_SALT = 'saltySalt123';
const TOKEN_SALT = 'saltySalt321__';

function getPasswordHash(password: string) {
  return md5(password + PASSWORD_SALT);
}
function createToken(user:string) {
  return md5(user + TOKEN_SALT);
}

function setSessionTime() {
  return new Date(Date.now() + 300 * 1000).toISOString();
}
async function checkCredeindials(collection: Collection, login: string, email: string) {
  const isUsedLogin = await collection.countDocuments({ login }, { limit: 1 });
  const isUsedEmail = await collection.countDocuments({ email }, { limit: 1 });

  return { isUsedLogin, isUsedEmail };
}

const register = async (UserCredentials: UserRegisterType) => {
  const collection = await usersCollection;
  const { isUsedLogin, isUsedEmail } = await checkCredeindials(collection, UserCredentials.login, UserCredentials.email);

  const result = {
    status: false,
    token: '',
  };

  if (!isUsedLogin && !isUsedEmail) {
    const newUser = {
      login: UserCredentials.login,
      email: UserCredentials.email,
      passwordHash: getPasswordHash(UserCredentials.password),
    };

    const createdUser = await collection.insertOne(newUser);

    const session = await sessionsCollection;

    const newSession = {
      user: UserCredentials.login,
      token: createToken(UserCredentials.login),
      expiresAt: setSessionTime(),
    };

    await session.insertOne(newSession);

    result.status = createdUser !== null;
    result.token = newSession.token;
  }

  return result;
};

async function checkSession(token: string) {
  const session = await sessionsCollection;
  const userSession = await session.findOne({ token });

  const result = {
    user: '',
    status: false,
  };

  if (userSession && userSession.expiresAt > new Date().toISOString()) {
    result.status = true;
    result.user = userSession.user;
    session.updateOne(userSession, { $set: { expiresAt: setSessionTime() } });
  } else {
    await session.deleteOne(userSession);
  }

  return result;
}

export {
  register,
  checkSession,
}
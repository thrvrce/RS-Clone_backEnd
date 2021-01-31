import md5 from 'md5';
import { Collection } from 'mongodb';
import { usersCollection, sessionsCollection } from './Collections';
import { UserRegisterType, UserLoginType } from '../types/Users';

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

function createSession(login: string) {
  return {
    user: login,
    token: createToken(login),
    expiresAt: setSessionTime(),
  };
}

const register = async (UserCredentials: UserRegisterType) => {
  const collection = await usersCollection;
  const {
    isUsedLogin,
    isUsedEmail,
  } = await checkCredeindials(collection, UserCredentials.login, UserCredentials.email);

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

    const newSession = createSession(UserCredentials.login);

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

async function userLogin(UserCredentials: UserLoginType) {
  const collection = await usersCollection;
  const User = await collection.findOne({
    login: UserCredentials.login,
    passwordHash: getPasswordHash(UserCredentials.password),
  });

  const result = {
    status: false,
    token: '',
  };

  if (User) {
    const session = await sessionsCollection;
    await session.deleteMany({ user: User.login });

    const newSession = createSession(User.login);

    const createdSession = await session.insertOne(newSession);

    result.status = (User && createdSession);
    result.token = newSession.token;
  }

  return result;
}

async function logOut(user: string) {
  const session = await sessionsCollection;
  await session.deleteMany({ user });
  return true;
}

export {
  register,
  checkSession,
  userLogin,
  logOut,
};

import { MongoClient } from 'mongodb';

const URL: string = 'mongodb+srv://thrvrce:Pas$w0rD-RS-C10Ne@rs-clone-cluster.mrrjc.mongodb.net/?retryWrites=true&w=majority';
const DBNAME: string = 'RsClone';
const USERS = 'Users';
const SESSIONS = 'Sessions';
const TOPICS = 'Topics';

async function getMongoInstance() {
  const client = await MongoClient.connect(URL);
  return client.db(DBNAME);
}

async function getCollection(collectionName: string) {
  const db = await getMongoInstance();
  return db.collection(collectionName);
}

const usersCollection = getCollection(USERS);
const sessionsCollection = getCollection(SESSIONS);
const topicsCollection = getCollection(TOPICS);

export {
  usersCollection,
  sessionsCollection,
  topicsCollection,
}
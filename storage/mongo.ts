import { MongoClient } from 'mongodb';
import { ItemType } from '../types/items';

// const url: string = 'mongodb+srv://thrvrce:<password>@rs-clone-cluster.mrrjc.mongodb.net/<dbname>?retryWrites=true&w=majority';
const URL: string = 'mongodb+srv://thrvrce:Pas$w0rD-RS-C10Ne@rs-clone-cluster.mrrjc.mongodb.net/?retryWrites=true&w=majority';
const DBNAME: string = 'test';
const TESTCOLLECION = 'test_Collection';

const getMongoInstance = async () => {
  const client = await MongoClient.connect(URL);
  return client.db(DBNAME);
};

const getCollection = async () => {
  const db = await getMongoInstance();
  return db.collection(TESTCOLLECION);
};

const listAll = async () => {
  const collection = await getCollection();
  return collection.find({}).toArray();
};

const getById = async (id: string) => {
  const collection = await getCollection();

  return collection.findOne({ id });
};

const create = async (item: ItemType) => {
  const collection = await getCollection();
  const response = await collection.insertOne(item);
  return response.ops[0];
};

const update = async (item: ItemType) => {
  const collection = await getCollection();
  const { id } = item;
  const response = collection.replaceOne({ id }, item);
  return (await response).ops[0];
};

const remove = async (id: string) => {
  const collection = await getCollection();

  return collection.deleteOne({ id });
};

export {
  listAll,
  getById,
  create,
  update,
  remove,
};

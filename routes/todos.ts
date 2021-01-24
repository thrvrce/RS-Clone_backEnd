import { Router } from 'express';
import * as storageFuncs from '../storage/mongo';

const router = Router();
/*
// const arrOfItems: { id: number, title: string }[] = [];
// const arrOfItems: object[] = [];

// interface IarrOfItems {
//   id: number;
//   title: string;
//   obj:{
//     title: string;
//   };
// }
// const tstobj:{title: string} = { title: 'test' };
// console.log(tstobj);
// const arrOfItems: IarrOfItems[] = [];

// arrOfItems.push({title: 'newtitle', id: 1, obj: tstobj });
// console.log(arrOfItems);
*/

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

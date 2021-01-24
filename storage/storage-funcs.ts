type ItemType = {
id: string;
title: string;
complete: boolean;
}
let arrOfItems: ItemType[] = [];

const readItemList = async (): Promise<ItemType[]> => arrOfItems;

const createItemList = async (item: ItemType[]): Promise<ItemType[]> => {
  // arrOfItems = [...arrOfItems, ...item];
  // console.log(item);
  arrOfItems = item;
  // console.log(arrOfItems);
  return item;
};

// arrOfItems.push({id: '1', title: 'q', complete: false});
// console.log(arrOfItems);

// writeItemList([{id: '2', title: 'q', complete: false}, {id: '3', title: 'q', complete: false}])
// console.log(arrOfItems);

const listAll = async () => readItemList();

const getById = async (id: string): Promise<ItemType[] | undefined> => {
  const list:ItemType[] = await readItemList();
  return list.filter((val) => val.id === id);
};

const create = async (item: ItemType[]): Promise<ItemType[] | undefined> => {
  // console.log(item);
  const newItemList = await createItemList(item);
  return newItemList;
};

const update = async (item: ItemType) :Promise<ItemType[] | undefined> => {
  const list:ItemType[] = await readItemList();
  const itemIndex: number = list.findIndex((val) => val.id === item.id);

  list[itemIndex] = item;
  const newItemList = await createItemList(list);
  return newItemList;
};

const remove = async (id: string):Promise<ItemType[] | undefined> => {
  const list:ItemType[] = await readItemList();
  const itemIndex: number = list.findIndex((val) => val.id === id);

  // const deletedList: ItemType[] = list.splice(itemIndex, 1);
  list.splice(itemIndex, 1);
  const newItemList = await createItemList(list);
  return newItemList;
};

export {
  listAll,
  getById,
  create,
  update,
  remove,
};

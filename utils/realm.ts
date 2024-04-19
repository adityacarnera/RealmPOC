// // realm.ts
import Realm from 'realm';
import { TaskSchema, Task } from '../schemas/TaskSchema';


const databaseOptions: Realm.Configuration = {
  path: 'realmCRUD.realm',
  schema: [TaskSchema],
  schemaVersion: 0,
};

const realm = new Realm(databaseOptions);

export const addTask = (id: number, title: string, completed = false): void => {
  realm.write(() => {
    realm.create<Task>('Task', {
      id: id,
      title,
      completed,
    });
  });
};

export const getTasks = (): any => {
  return realm.objects<Task>('Task');
};

export const updateTask = (taskId: number, newData: Partial<Task>): void => {
  const task = realm.objectForPrimaryKey<Task>('Task', taskId);  

  if (task) {
    realm.write(() => {
      Object.keys(newData).forEach((key) => {
        (task as any)[key] = newData[key];
      });
    });
  } else {
    console.error(`Task with ID ${taskId} not found.`);
  }
};


export const deleteTask = (taskId: number): void => {
  const task = realm.objectForPrimaryKey<Task>('Task', taskId);
  realm.write(() => {
    realm.delete(task);
  });
};

export const clearTasks = (): void => {
    realm.write(() => {
      const allTasks = realm.objects<Task>('Task');
      realm.delete(allTasks);
    });
  };

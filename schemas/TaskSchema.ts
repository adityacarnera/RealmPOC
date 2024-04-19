// TaskSchema.ts
export interface Task {
    id: number;
    title: string;
    completed: boolean;
  }
  
  export const TaskSchema = {
    name: 'Task',
    properties: {
      id: 'int',
      title: 'string',
      completed: 'bool',
    },
    primaryKey: 'id',
  };
  
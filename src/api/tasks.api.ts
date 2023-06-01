import { instance, TaskPriorities, TaskStatuses } from "./api";

export const tasksApi = {
  getTasks(todolistID: string) {
    return instance
      .get<GetTasksResponseType>(`todo-lists/${todolistID}/tasks`)
      .then((res) => res.data.items);
  },
  addTask(todolistID: string, taskTitle: string) {
    return instance
      .post<ResponseType<{ item: TaskResponseType }>>(
        `todo-lists/${todolistID}/tasks`,
        { title: taskTitle }
      )
      .then((res) => res.data);
  },
  editTask(
    todolistID: string,
    taskID: string,
    properties: {
      title: string;
      description: string;
      completed: boolean;
      status: number;
      priority: number;
      startDate: string;
      deadline: string;
    }
  ) {
    return instance
      .put<ResponseType<{ item: TaskResponseType }>>(
        `todo-lists/${todolistID}/tasks/${taskID}`,
        properties
      )
      .then((res) => res);
  },
  deleteTask(todolistID: string, taskID: string) {
    return instance
      .delete<ResponseType<{ item: TaskResponseType }>>(
        `todo-lists/${todolistID}/tasks/${taskID}`
      )
      .then((res) => res.data);
  },
};

export type FieldError = {
  field: string;
  error: string;
};

export type ResponseType<D> = {
  resultCode: number;
  messages: string[];
  data: D;
  fieldsErrors?: FieldError[];
};

export type TaskResponseType = {
  description: string;
  title: string;
  completed: boolean;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
export type GetTasksType = {
  items: TaskResponseType[];
  error: string | null;
  totalCount: number;
};
export type TaskType = {
  description: string;
  title: string;
  completed: boolean;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

type GetTasksResponseType = {
  error: null | string;
  items: TaskType[];
  totalCount: number;
};

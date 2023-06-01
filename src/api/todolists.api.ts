import { instance } from "./api";
import { ResponseType } from "./tasks.api";

export const todolistsApi = {
  getTodolists() {
    return instance
      .get<TodolistResponseType[]>(`todo-lists`)
      .then((res) => res.data);
  },
  createTodolist(title: string) {
    return instance
      .post<ResponseType<{ item: TodolistType }>>(`todo-lists`, { title })
      .then((res) => res.data);
  },
  removeTodolist(id: string) {
    return instance
      .delete<ResponseType<{}>>(`todo-lists/${id}`)
      .then((res) => res.data);
  },
  editTodolist(id: string, title: string) {
    return instance
      .put<ResponseType<{}>>(`todo-lists/${id}`, { title })
      .then((res) => res.data);
  },
};

export type TodolistResponseType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

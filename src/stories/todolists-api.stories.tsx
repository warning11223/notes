import React, { useEffect, useState } from "react";
import { todolistThunks } from "../reducers/todolist/todolistSlice";
import { useActions } from "../common/utils";
import { tasksThunks } from "../reducers/tasks/tasksSlice";

export default {
  title: "API",
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  const { getTodolists } = useActions(todolistThunks);

  useEffect(() => {
    getTodolists().then((todolists) => setState(todolists));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const { createTodolist } = useActions(todolistThunks);

  useEffect(() => {
    createTodolist("28.03.2023").then((res) => setState(res));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const { removeTodolist } = useActions(todolistThunks);

  useEffect(() => {
    removeTodolist({ todolistID: "63630817-1962-4c73-977d-04cb871869e9" }).then(
      (res) => setState(res)
    );
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  const { getTodolists, editTodolist, createTodolist, removeTodolist } =
    useActions(todolistThunks);
  const { editTask, addTask, deleteTask, fetchTasks } = useActions(tasksThunks);

  useEffect(() => {
    editTodolist({
      todolistID: "68208f6c-1e6e-4cc7-a19f-dd36cf56472c",
      title: "new 2023",
    }).then((res) => setState(res));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const todolistID = "63630817-1962-4c73-977d-04cb871869e9";
  const { fetchTasks } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(todolistID).then((res) => setState(res));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const todolistID = "63630817-1962-4c73-977d-04cb871869e9";
  const { addTask } = useActions(tasksThunks);

  useEffect(() => {
    addTask({ todolistID, taskTitle: "new task" }).then((res) => setState(res));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const todolistID = "63630817-1962-4c73-977d-04cb871869e9";
  const taskID = "6820d652-0e8c-47ad-81c9-eaee9d8c15a4";
  const { editTask } = useActions(tasksThunks);

  useEffect(() => {
    editTask({
      taskID,
      todolistID,
      taskModel: {
        title: "hello world!!!",
        completed: true,
        deadline: "",
        description: "",
        priority: 0,
        startDate: "",
        status: 200,
      },
    }).then((res) => setState(res));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const todolistID = "63630817-1962-4c73-977d-04cb871869e9";
  const taskID = "6820d652-0e8c-47ad-81c9-eaee9d8c15a4";
  const { deleteTask } = useActions(tasksThunks);

  useEffect(() => {
    deleteTask({ taskID, todolistID }).then((res) => setState(res));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

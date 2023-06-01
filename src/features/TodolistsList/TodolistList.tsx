import React, { useCallback, useEffect } from "react";
import { todolistThunks } from "../../reducers/todolist/todolistSlice";
import Grid from "@mui/material/Grid/Grid";
import Paper from "@mui/material/Paper/Paper";
import { Todolist } from "./TodoList";
import { AddForm } from "../../components/AddForm";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../common/hooks";
import { useActions } from "../../common/utils";
import {selectTodolists} from '../../reducers/todolist/todolistSelectors';
import {selectTasks} from '../../reducers/tasks/tasksSelectors';
import {selectIsLoggedIn} from '../../reducers/auth/authSelectors';

type TodolistsListPropsType = {
  demo?: boolean;
};

export const TodolistsList: React.FC<TodolistsListPropsType> = ({ demo }) => {
  const { getTodolists, createTodolist } = useActions(todolistThunks);
  const todolists = useAppSelector(selectTodolists);
  const tasks = useAppSelector(selectTasks);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    getTodolists();
  }, []);

  const addTodoList = useCallback((title: string) => {
    return createTodolist(title).unwrap()
  }, []);

  const todoListsRender = todolists.map((item) => {
    const allTodolistTasks = tasks[item.id];

    return (
      <Grid item xs={3.5} key={item.id}>
        <Paper elevation={3} style={{ position: "relative" }}>
          <Todolist todolist={item} tasks={allTodolistTasks} demo={demo} />
        </Paper>
      </Grid>
    );
  });

  const emptyTodolists = (
    <Grid item xs={3.5} style={{ margin: "0 auto" }}>
      <Paper
        elevation={3}
        style={{
          width: "400px",
          padding: "40px 20px",
          textAlign: "center",
          fontSize: "30px",
          backgroundColor: "#ffa726",
          color: "#ffffff",
        }}
      >
        'Empty! Add new list'
      </Paper>
    </Grid>
  );

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Grid container style={{ padding: "20px 0px 20px 0px" }}>
        <AddForm placeholder="Add list" addTaskCallback={addTodoList} />
      </Grid>
      <Grid
        container
        spacing={5}
        style={{ flexWrap: "nowrap", overflowX: "scroll", height: "80vh" }}
      >
        {!todolists.length ? emptyTodolists : todoListsRender}
      </Grid>
    </>
  );
};

import React, { useEffect } from "react";
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container/Container";
import { Header } from "../components/Header";
import { useSelector } from "react-redux";
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TodolistsList } from "../features/TodolistsList";
import { Login } from "../features/Login";
import { SneakBar } from "../features/SneakBar";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { authThunks } from "../reducers/auth/authSlice";
import { useActions } from "../common/utils";
import {selectStatus} from '../reducers/error/errorSelectors';

export type FilterValuesType = "all" | "active" | "completed";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#ffa726",
    },
    info: {
      main: "#ffffff",
    },
  },
});

type AppPropsType = {
  demo?: boolean;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <TodolistsList />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <h1>404 not found</h1>,
  },
]);

const App: React.FC<AppPropsType> = ({ demo }) => {
  const status = useSelector(selectStatus);
  const { authMe } = useActions(authThunks);

  useEffect(() => {
    authMe();
  }, []);

  return (
    <div className="App">
      <div style={{height: '80px'}}>
        <ThemeProvider theme={theme} >
          <Header />
          {status === "loading" && <LinearProgress color="warning" />}
        </ThemeProvider>
      </div>

      {status === "initialized" ? (
        <div
          style={{
            position: "fixed",
            top: "30%",
            textAlign: "center",
            width: "100%",
          }}
        >
          <CircularProgress disableShrink color={"warning"} size={80} />
        </div>
      ) : (
        <Container maxWidth="lg">
          <RouterProvider router={router} />
        </Container>
      )}

      <SneakBar />
    </div>
  );
};

export default App;

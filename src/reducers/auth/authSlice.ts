import { createSlice } from "@reduxjs/toolkit";
import { errorActions } from "../error/errorSlice";
import {
  createAppAsyncThunk,
  handlerServerNetworkError,
  handleServerAppError
} from "../../common/utils";
import { todolistFunctions } from "../todolist";
import { authAPI, AuthRequestType } from "../../api/auth.api";
import { ResultCode } from "../../api/api";

export type InitialAuthReducerStateType = typeof initialState;

const initialState = {
  isLoggedIn: false,
  captcha: ""
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.value;
        state.captcha = "";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.value;
      })
      .addCase(authMe.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.value;
      })
      .addCase(captcha.fulfilled, (state, action) => {
        state.captcha = action.payload.captcha;
      });
  }
});

export const authSlice = loginSlice.reducer;

const login = createAppAsyncThunk<{ value: boolean },
  { data: AuthRequestType }>("auth/login", async ({ data }, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  try {
    //dispatch(errorActions.setStatusAC({status: 'initialized'}))
    const res = await authAPI.login(data);
    if (res.data.resultCode === ResultCode.OK) {
      //dispatch(errorActions.setStatusAC({status: 'succeeded'}))
      return { value: true };
    } else if (res.data.resultCode === ResultCode.Captcha) {
      dispatch(captcha());
      return rejectWithValue({ data: res.data, showGlobalError: true });
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue({ data: res.data, showGlobalError: true });
    }
  } catch (e) {
    handlerServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

const logout = createAppAsyncThunk<{ value: boolean }, void>(
  "auth/logout",
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    try {
      dispatch(errorActions.setStatusAC({ status: "initialized" }));
      const res = await authAPI.logout();

      if (res.data.resultCode === ResultCode.OK) {
        dispatch(errorActions.setStatusAC({ status: "succeeded" }));
        dispatch(todolistFunctions.clearData());
        return { value: false };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (e) {
      handlerServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  }
);

const authMe = createAppAsyncThunk("auth/authMe", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  try {
    dispatch(errorActions.setStatusAC({ status: "initialized" }));
    const res = await authAPI.me();
    if (res.data.resultCode === ResultCode.OK) {
      dispatch(errorActions.setStatusAC({ status: "succeeded" }));
      return { value: true };
    } else {
      dispatch(errorActions.setStatusAC({ status: "idle" }));
      return rejectWithValue(null);
    }
  } catch (e) {
    handlerServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

const captcha = createAppAsyncThunk("auth/captcha", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  try {
    const res = await authAPI.captcha();
    return { captcha: res.data.url };
  } catch (e) {
    handlerServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

export const authThunks = {
  login,
  logout,
  authMe
};

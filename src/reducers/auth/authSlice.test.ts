import {
  authSlice,
  authThunks,
  InitialAuthReducerStateType,
} from "./authSlice";

let initialState: InitialAuthReducerStateType;

beforeEach(() => {
  initialState = {
    isLoggedIn: false,
    captcha: ''
  };
});

test("isLoggedIn should be true", () => {
  const action = authThunks.login.fulfilled({ value: true }, "requestId", {
    data: { email: "", rememberMe: true, password: "", captcha: "" },
  });

  const newState = authSlice(initialState, action);

  expect(newState.isLoggedIn).toBe(true);
});

test("isLoggedIn should be false", () => {
  const action = authThunks.logout.fulfilled({ value: false }, "requestId");

  const newState = authSlice(initialState, action);

  expect(newState.isLoggedIn).toBe(false);
});

test("authMe should return false", () => {
  const action = authThunks.authMe.fulfilled({ value: false }, "requestId");

  const newState = authSlice(initialState, action);

  expect(newState.isLoggedIn).toBe(false);
});

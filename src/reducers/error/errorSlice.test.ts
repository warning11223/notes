import { errorActions, errorReducer, InitialStateType } from "./errorSlice";

let initialState: InitialStateType;

beforeEach(() => {
  initialState = {
    status: "idle",
    error: null,
  };
});

test("status should be loading", () => {
  const newState = errorReducer(
    initialState,
    errorActions.setStatusAC({ status: "loading" })
  );

  expect(newState.status).toBe("loading");
});

test("error should be correct display", () => {
  const newState = errorReducer(
    initialState,
    errorActions.setErrorAC({ error: "some error" })
  );

  expect(newState.error).toBe("some error");
});

test("loadingTasks should be correct display", () => {
  const newState = errorReducer(
    initialState,
    errorActions.setStatusAC({ status: "loadingTasks" })
  );

  expect(newState.status).toBe("loadingTasks");
});

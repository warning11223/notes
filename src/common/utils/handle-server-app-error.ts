import { AppDispatch } from "../../app/store";
import { errorActions } from "../../reducers/error/errorSlice";
import { ResponseType } from "../../api/tasks.api";

export const handleServerAppError = <T>(
  data: ResponseType<T>,
  dispatch: AppDispatch
) => {
  const errorMessage = data.messages[0].length > 0 ? data.messages[0] : "Some error occurred";
  dispatch(errorActions.setErrorAC({ error: errorMessage }));
  dispatch(errorActions.setStatusAC({ status: "failed" }));
};

import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";
import {ResponseType} from '../../api/tasks.api';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: any;
}>();

export type RejectValueType = {
  data: ResponseType<{}>
  showGlobalError: boolean
}

import {RootState} from '../app/store';

export const selectStatus = (state: RootState) => state.errorReducer.status
export const selectError = (state: RootState) => state.errorReducer.error

import {todolistThunks, todolistSlice} from './todolistSlice';

export const todolistFunctions = {
  ...todolistThunks,
  ...todolistSlice.actions,
};

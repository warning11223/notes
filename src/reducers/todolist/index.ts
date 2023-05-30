import {todolistThunks,  todolistSlice} from './todolistReducer'

export const todolistFunctions = {
    ...todolistThunks,
    ...todolistSlice.actions
}

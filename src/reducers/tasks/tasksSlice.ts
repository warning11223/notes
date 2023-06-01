import {ResultCode} from '../../api/api';
import {createSlice} from '@reduxjs/toolkit';
import {todolistThunks} from '../todolist/todolistSlice';
import {createAppAsyncThunk, handlerServerNetworkError, handleServerAppError,} from '../../common/utils';
import {todolistFunctions} from '../todolist';
import {TaskResponseType, tasksApi, TaskType} from '../../api/tasks.api';

export type TasksType = {
    [key: string]: TaskResponseType[];
};

export type UpdateTaskModelType = {
    title?: string;
    description?: string;
    completed?: boolean;
    status?: number;
    priority?: number;
    startDate?: string;
    deadline?: string;
};

const initialState: TasksType = {
    /*[todoListId1]: [
          {id: v1(), title: 'HTML&CSS', status: 1, todoListId: todoListId1, addedDate: '', completed: true, deadline: '', description: '', order: 0, priority: 0, startDate: ''},
          {id: v1(), title: 'JS', status: 1, todoListId: todoListId1, addedDate: '', completed: true, deadline: '', description: '', order: 0, priority: 0, startDate: ''},
          {id: v1(), title: 'ReactJS', status: 1, todoListId: todoListId1, addedDate: '', completed: true, deadline: '', description: '', order: 0, priority: 0, startDate: ''},
          {id: v1(), title: 'Rest API', status: 1, todoListId: todoListId1, addedDate: '', completed: true, deadline: '', description: '', order: 0, priority: 0, startDate: ''},
          {id: v1(), title: 'GraphQL', status: 1, todoListId: todoListId1, addedDate: '', completed: true, deadline: '', description: '', order: 0, priority: 0, startDate: ''},
      ],
      [todoListId2]: [
          {id: v1(), title: 'Milk', status: 1, todoListId: todoListId1, addedDate: '', completed: true, deadline: '', description: '', order: 0, priority: 0, startDate: ''},
          {id: v1(), title: 'Bred', status: 1, todoListId: todoListId1, addedDate: '', completed: true, deadline: '', description: '', order: 0, priority: 0, startDate: ''},
      ]*/
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistID] = action.payload.tasks;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task);
            })
            .addCase(editTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistID];
                const index = tasks.findIndex(
                    (item) => item.id === action.payload.taskID
                );
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.taskModel};
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const index = state[action.payload.todolistID].findIndex(
                    (item) => item.id === action.payload.taskID
                );
                if (index > -1) {
                    state[action.payload.todolistID].splice(index, 1);
                }
            })
            .addCase(todolistThunks.getTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach((item) => {
                    state[item.id] = [];
                });
            })
            .addCase(todolistThunks.createTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = [];
            })
            .addCase(todolistThunks.removeTodolist.fulfilled, (state, action) => {
                delete state[action.payload.todolistID];
            })
            .addCase(todolistFunctions.clearData, () => {
                return {};
            });
    },
});

const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistID: string },
    string>('tasks/fetchTasks', async (todolistID: string, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;

    try {
        const tasks = await tasksApi.getTasks(todolistID);
        return {tasks, todolistID};
    } catch (e) {
        handlerServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    }
});

const addTask = createAppAsyncThunk<{ task: TaskResponseType },
    { todolistID: string; taskTitle: string }>('tasks/addTask', async ({todolistID, taskTitle}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;

    try {
        const res = await tasksApi.addTask(todolistID, taskTitle);
        if (res.resultCode === ResultCode.OK) {
            const task = res.data.item;
            return {task};
        } else {
            handleServerAppError(res, dispatch);
            return rejectWithValue(null);
        }
    } catch (e: any) {
        handlerServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    }
});

const deleteTask = createAppAsyncThunk<{ todolistID: string; taskID: string },
    { todolistID: string; taskID: string }>('tasks/deleteTask', async ({todolistID, taskID}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;

    try {
        const res = await tasksApi.deleteTask(todolistID, taskID);
        if (res.resultCode === ResultCode.OK) {
            return {todolistID, taskID};
        } else {
            handleServerAppError(res, dispatch);
            return rejectWithValue(null);
        }
    } catch (e) {
        handlerServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    }
});

const editTask = createAppAsyncThunk<{ todolistID: string; taskID: string; taskModel: UpdateTaskModelType },
    { todolistID: string; taskID: string; taskModel: UpdateTaskModelType }>('tasks/editTask', async ({
                                                                                                         todolistID,
                                                                                                         taskID,
                                                                                                         taskModel
                                                                                                     }, thunkAPI) => {
    const {dispatch, getState, rejectWithValue} = thunkAPI;

    try {
        const state = getState();
        const task = state.tasksReducer[todolistID].find(
            (item) => item.id === taskID
        );

        if (!task) {
            console.warn('task not found in the state');
            return rejectWithValue(null);
        }

        const model = {
            title: task.title,
            completed: task.completed,
            status: task.status,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            ...taskModel,
        };

        const res = await tasksApi.editTask(todolistID, taskID, model);
        if (res.data.resultCode === ResultCode.OK) {
            return {todolistID, taskID, taskModel: res.data.data.item};
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
        }
    } catch (e) {
        handlerServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    }
});

export const tasksReducer = tasksSlice.reducer;
export const tasksThunks = {
    fetchTasks,
    addTask,
    editTask,
    deleteTask,
};

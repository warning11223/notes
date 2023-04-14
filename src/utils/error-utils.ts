import {setErrorAC, setStatusAC} from '../reducers/errorReducer';
import {AppDispatch} from '../app/store';
import {ResponseType} from '../api/todolist-api';

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: AppDispatch) => {
    const errorMessage = data.messages[0].length > 0 ? data.messages[0] : 'Some error occurred'
    dispatch(setErrorAC(errorMessage))
    dispatch(setStatusAC('failed'))
}

export const handlerServerNetworkError = (error: { message: string }, dispatch: AppDispatch) => {
    dispatch(setErrorAC(error.message))
    dispatch(setStatusAC('failed'))
}

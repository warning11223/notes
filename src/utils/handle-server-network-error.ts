import {AppDispatch} from '../app/store';
import axios, {AxiosError} from 'axios';
import {errorActions} from '../reducers/error/errorReducer';

export const handlerServerNetworkError = (error: unknown, dispatch: AppDispatch) => {
    const err = error as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : 'Some error occurred'
        dispatch(errorActions.setErrorAC({error}))
    } else {
        dispatch(errorActions.setErrorAC({error: `Native error ${err.message}`}))
    }

    dispatch(errorActions.setStatusAC({status: 'failed'}))
}

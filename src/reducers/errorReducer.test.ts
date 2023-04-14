import {errorReducer, InitialStateType, setErrorAC, setStatusAC} from './errorReducer';

let initialState: InitialStateType;

beforeEach(() => {
    initialState = {
        status: 'idle',
        error: null,
    }
})

test('status should be edited', () => {

    const newState = errorReducer(initialState, setStatusAC('loading'))

    expect(newState.status).toBe('loading')

})

test('error should be correct display', () => {

    const newState = errorReducer(initialState, setErrorAC('some error'))

    expect(newState.error).toBe('some error')

})

test('loadingTasks should be correct display', () => {

    const newState = errorReducer(initialState, setStatusAC('loadingTasks'))

    expect(newState.status).toBe('loadingTasks')

})


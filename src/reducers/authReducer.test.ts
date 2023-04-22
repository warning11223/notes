import {errorReducer, InitialStateType, setStatusAC} from './errorReducer';
import {authAC, authReducer, InitialAuthReducerStateType} from './authReducer';

let initialState: InitialAuthReducerStateType;

beforeEach(() => {
    initialState = {
        isLoggedIn: false
    }
})

test('isLoggedIn should be true', () => {

    const newState = authReducer(initialState, authAC({value: true}))

    expect(newState.isLoggedIn).toBe(true)

})

import {authReducer, authThunks, InitialAuthReducerStateType} from './authReducer';

let initialState: InitialAuthReducerStateType;

beforeEach(() => {
    initialState = {
        isLoggedIn: false
    }
})

test('isLoggedIn should be true', () => {
    const action = authThunks.login.fulfilled({value: true}, 'req', {data: {email: '', rememberMe: true, password: '', captcha: ''}})

    const newState = authReducer(initialState, action)

    expect(newState.isLoggedIn).toBe(true)

})

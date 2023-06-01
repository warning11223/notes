import { RootState } from "../../app/store";

export const selectIsLoggedIn = (state: RootState) => state.authReducer.isLoggedIn;
export const selectCaptcha = (state: RootState) => state.authReducer.captcha;

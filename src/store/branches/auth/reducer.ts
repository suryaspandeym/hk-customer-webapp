import { TOKEN_KEY, REFRESH_TOKEN_KEY, TOKEN_THRESHOLD_KEY, USER_TYPE } from '@utilities';

import { AuthActionType } from './enums';
import { AuthState, AuthAction } from './interfaces';

export const initialState: AuthState = {
	token: localStorage.getItem(TOKEN_KEY) || '',
	locale: 'en',
	loading: false,
	threshold: Number(localStorage.getItem(TOKEN_THRESHOLD_KEY)) || 0,
	loginError: '',
	logoutError: '',
	signupError: '',
	refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY) || '',
	userType: localStorage.getItem(USER_TYPE) || '',
	passwordResetError: '',
	isLoading: false,
	isErrored: false,
	isFetched: false,
	sendOTP: { phoneNumber: '' },
	sessionID: '',
	verifyOTP: { phoneNumber: '', otp: '' },
	sessionId: ''
};

export default (state = initialState, { type, payload }: AuthAction): AuthState => {
	switch (type) {
		case AuthActionType.LOGIN_REQUEST:
		case AuthActionType.LOGOUT_REQUEST:
		case AuthActionType.SIGNUP_REQUEST:
		case AuthActionType.SET_LOCALE_REQUEST:
		case AuthActionType.PASSWORD_RESET_REQUEST:
			return {
				...state,
				loading: true
			};
		case AuthActionType.LOGIN_FAILED:
		case AuthActionType.LOGOUT_FAILED:
		case AuthActionType.SIGNUP_FAILED:
		case AuthActionType.SET_LOCALE_FAILED:
		case AuthActionType.PASSWORD_RESET_FAILED:
			return {
				...state,
				...payload,
				loading: false
			};
		case AuthActionType.LOGIN_SUCCESS:
		case AuthActionType.LOGOUT_SUCCESS:
		case AuthActionType.SIGNUP_SUCCESS:
		case AuthActionType.SET_LOCALE_SUCCESS:
		case AuthActionType.PASSWORD_RESET_SUCCESS:
			return {
				...state,
				...payload,
				loading: false
			};
		case AuthActionType.RESET_AUTH:
			return initialState;

		case AuthActionType.SEND_OTP:
		case AuthActionType.VERIFY_OTP:
			return {
				...state,
				isLoading: true
			};

		case AuthActionType.SEND_OTP_FAILED:
		case AuthActionType.VERIFY_OTP_FAILED:
			return {
				...state,
				isLoading: false,
				isErrored: true
			};

		case AuthActionType.SEND_OTP_SUCCESS:
			return {
				...state,
				sessionID: payload.session_id,
				isLoading: false,
				isFetched: true
			};
		case AuthActionType.SET_LOCALE_REQUEST:
			return {
				...state,
				loading: true
			};
		case AuthActionType.SET_LOCALE_FAILED:
			return {
				...state,
				...payload,
				loading: false
			};
		case AuthActionType.SET_LOCALE_SUCCESS:
			return {
				...state,
				...payload,
				loading: false
			};
		case AuthActionType.RESET_AUTH:
			return initialState;

		default:
			return state;
	}
};

import { type AuthActionType } from './enums';

export interface AuthState {
	token: string;
	locale: string;
	loading: boolean;
	threshold: number;
	loginError: string;
	logoutError: string;
	signupError: string;
	refreshToken: string;
	passwordResetError: string;

	isLoading: boolean;
	isErrored: boolean;
	isFetched: boolean;
	sendOTP: { phoneNumber: string };
	sessionId: string;
	verifyOTP: { phoneNumber: string; otp: number };

	[x: string]: any;
}
export interface AuthAction {
	type: AuthActionType;
	payload?: Partial<AuthState> | any;
}

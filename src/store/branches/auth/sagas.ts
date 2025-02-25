import { put, call, takeLatest, type CallEffect, type PutEffect, type ForkEffect } from 'redux-saga/effects';

import { i18n } from '@i18n';
import { type AuthAction } from './interfaces';
import { AuthActionType } from './enums';
import { setItems, saveLocale, setDocumentLang } from '@utilities';

import { sendOTP, verifyOTP } from './api';
import { toast } from '@utilities/toasts';

type AuthSagaEffect = Generator<CallEffect<any> | PutEffect<AuthAction>>;
type AuthSagaForkEffect = Generator<ForkEffect<void>>;

export function* localeEffect(action: AuthAction): AuthSagaEffect {
	try {
		const locale = action.payload?.locale;

		if (!locale) {
			yield put({
				type: AuthActionType.SET_LOCALE_FAILED
			});

			return;
		}

		i18n.changeLanguage(locale);
		saveLocale(locale);
		setDocumentLang(locale);

		yield put({
			type: AuthActionType.SET_LOCALE_SUCCESS,
			payload: { locale }
		});
	} catch (error) {
		yield put({
			type: AuthActionType.SET_LOCALE_FAILED
		});
	}
}

export function* localeSaga(): AuthSagaForkEffect {
	yield takeLatest(AuthActionType.SET_LOCALE_REQUEST, localeEffect);
}

export function* sendOTPEffect(action: AuthAction): AuthSagaEffect {
	try {
		const {
			sendOTP: { phoneNumber },
			successCB
		} = action.payload;
		const data: any = yield call(sendOTP, {
			phone_number: `${phoneNumber}`
		});
		const payload = data.data;

		yield put({ type: AuthActionType.SEND_OTP_SUCCESS, payload });

		successCB();
	} catch (err: any) {
		yield put({ type: AuthActionType.SEND_OTP_FAILED });
		toast('ERROR', err.response?.data?.message);
	}
}

export function* sendOTPSaga(): AuthSagaForkEffect {
	yield takeLatest(AuthActionType.SEND_OTP, sendOTPEffect);
}

export function* verifyOTPEffect(action: AuthAction): AuthSagaEffect {
	try {
		const {
			auth,
			verifyOTP: { otp },
			successCB
		} = action.payload;
		const data: any = yield call(verifyOTP, {
			session_id: auth.sessionID,
			otp
		});
		const payload = data.data;
		yield call(setItems, payload.auth_response);
		successCB();
	} catch (err: any) {
		yield put({ type: AuthActionType.SEND_OTP_FAILED });
		toast('ERROR', err.response?.data?.message);
	}
}

export function* verifyOTPSaga(): AuthSagaForkEffect {
	yield takeLatest(AuthActionType.VERIFY_OTP, verifyOTPEffect);
}

export function* resendOTPEffect(action: AuthAction): AuthSagaEffect {
	try {
		const { phoneNumber } = action.payload;
		// TODO: Add Throttle
		// Reusing SEND_OTP Endpoint
		const data: any = yield call(sendOTP, {
			phone_number: `${phoneNumber}`
		});
		const payload = data.data;
		yield put({ type: AuthActionType.SEND_OTP_SUCCESS, payload });
	} catch (err: any) {
		yield put({ type: AuthActionType.SEND_OTP_FAILED });
		toast('ERROR', err.response?.data?.message);
	}
}

export function* resendOTPSaga(): AuthSagaForkEffect {
	yield takeLatest(AuthActionType.RESEND_OTP, resendOTPEffect);
}

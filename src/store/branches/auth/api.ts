import { type AxiosResponse } from 'axios';
import { postWithoutToken } from '@utilities';

export const sendOTP = async (data: any): Promise<AxiosResponse> =>
	await postWithoutToken('auth/login/send_otp', data, { addSourceHeader: true });
export const verifyOTP = async (data: any): Promise<AxiosResponse> =>
	await postWithoutToken('auth/login/verify_otp', data, { addSourceHeader: true });

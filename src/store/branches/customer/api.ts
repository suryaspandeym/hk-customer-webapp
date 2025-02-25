import { type AxiosResponse } from 'axios';
import { get, post, postWithoutToken } from '@utilities';

export const uploadFloorPlan = async (data: any): Promise<AxiosResponse> => await post('project/floor_plan', data);
export const sendOTP = async (data: any): Promise<AxiosResponse> =>
	await postWithoutToken('auth/lead/send_otp', data, { addSourceHeader: true });
export const verifyOTP = async (data: any): Promise<AxiosResponse> =>
	await postWithoutToken('auth/login/verify_otp', data, { addSourceHeader: true });
export const fetchQuotations = async (data): Promise<AxiosResponse> => await post(`quotation/all`, data);
export const addQuotation = async (data: any): Promise<AxiosResponse> => await post('quotation', data);
export const fetchUserDetails = async (): Promise<AxiosResponse> => await get('user');
export const updateQuotation = async (data): Promise<AxiosResponse> => await post(`quotation`, data);
export const getPredictionId = async (data: any): Promise<AxiosResponse> => await post('quotation/prediction', data);
export const getPrediction = async (predictionId: any): Promise<AxiosResponse> =>
	await get(`quotation/prediction/${predictionId}`);
export const getPreDesignQuotation = async (data: any): Promise<AxiosResponse> =>
	await post('area/pre-design-quotation', data);
export const getDefaultQuotations = async (data: any): Promise<AxiosResponse> =>
	await post('area/default/pre-design-quotation', data);
export const fetchDocuments = async (docIds: any): Promise<AxiosResponse> => await post(`document/all`, docIds);
export const fetchQuotationById = async (QuotationId): Promise<AxiosResponse> => await get(`quotation/${QuotationId}`);

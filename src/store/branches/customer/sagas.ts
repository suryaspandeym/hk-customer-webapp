import { put, call, takeLatest, type CallEffect, type PutEffect, type ForkEffect } from 'redux-saga/effects';
import { CustomerActionType } from './enums';
import { handleEmptyNullValues, setItems, toast, uploadDocumentArr } from '@utilities';
import {
	addQuotation,
	fetchQuotations,
	fetchUserDetails,
	sendOTP,
	updateQuotation,
	getPreDesignQuotation,
	getPrediction,
	getPredictionId,
	uploadFloorPlan,
	verifyOTP,
	getDefaultQuotations,
	fetchDocuments,
	fetchQuotationById
} from './api';
import { activateDocument } from '../products/api';
import { AnyAction } from 'redux';
import { type CustomerAction } from './interfaces';

type CustomerSagaEffect = Generator<CallEffect<any> | PutEffect<CustomerAction>>;
type CustomerSagaFormEffect = Generator<ForkEffect<void>>;

export function* updateFloorPlanEffect(action: AnyAction): CustomerSagaEffect {
	const { formData, successCB, errorCB, finalCB } = action.payload;
	const updateFloorPlanDocRequest = {
		...formData,
		attachments: formData?.files?.files.map((file: any) => ({
			file: file.name
		}))
	};
	delete updateFloorPlanDocRequest.files;

	try {
		const { data }: any = yield call(uploadFloorPlan, handleEmptyNullValues(updateFloorPlanDocRequest));
		const { attachments, category, subCategory, documentId, projectId, projectName } = data;
		const { arrPromises, uploadedDocuments } = uploadDocumentArr(
			{
				documents: [
					{
						category: formData.category,
						referenceType: formData.referenceType,
						subCategory: formData.subCategory,
						files: [formData.files.files[0]]
					}
				]
			},
			[{ category, subCategory, attachments, documentId }]
		);
		yield call(async () => await Promise.all(arrPromises));
		if (uploadedDocuments.length > 0) {
			yield call(activateDocument, { documentIds: uploadedDocuments });
		}
		yield put({
			type: CustomerActionType.SET_PROJECT_DETAILS,
			payload: { projectId, projectName, attachments, budget: formData?.budget }
		});
		successCB(data);
	} catch (error: any) {
		errorCB(error?.message);
	} finally {
		finalCB();
	}
}

export function* sendCustomerOTPEffect(action: CustomerAction): any {
	const {
		leadDetails: { phoneNumber, name },
		successCB,
		errorCB
	} = action.payload;
	try {
		const data: any = yield call(sendOTP, { phone_number: phoneNumber, name });
		const payload = data.data;

		yield put({ type: CustomerActionType.SEND_CUSTOMER_OTP_SUCCESS, payload });
		successCB();
	} catch (err: any) {
		yield put({ type: CustomerActionType.SEND_CUSTOMER_OTP_FAILED });
		errorCB(err.message);
	}
}

export function* verifyCustomerOTPEffect(action: CustomerAction): any {
	const {
		sessionID,
		verifyOTPDetails: { otp },
		successCB,
		errorCB
	} = action.payload;
	try {
		const data: any = yield call(verifyOTP, {
			session_id: sessionID,
			otp
		});
		const payload = data.data;
		yield call(setItems, payload.auth_response);
		successCB();
	} catch (err: any) {
		yield put({ type: CustomerActionType.SEND_CUSTOMER_OTP_FAILED });
		errorCB(err.message);
	}
}

export function* resendCustomerOTPEffect(action: CustomerAction): any {
	try {
		const { phoneNumber } = action.payload;
		const data: any = yield call(sendOTP, {
			phone_number: `${phoneNumber}`
		});
		const payload = data.data;
		yield put({ type: CustomerActionType.SEND_CUSTOMER_OTP_SUCCESS, payload });
	} catch (err: any) {
		yield put({ type: CustomerActionType.SEND_CUSTOMER_OTP_FAILED });
		toast('ERROR', err.response?.data?.message);
	}
}

export function* fetchQuotationsEffect(action: CustomerAction): any {
	const { leadId, successCB, errorCB, finalCB } = action.payload;
	try {
		const { data }: any = yield call(fetchQuotations, { leadId, system: true });
		yield put({
			type: CustomerActionType.STORE_QUOTATIONS,
			payload: data
		});
		successCB(data);
	} catch (error) {
		if (errorCB) errorCB();
		yield put({
			type: CustomerActionType.ERROR_FETCH_QUOTATIONS,
			payload: {
				error
			}
		});
	} finally {
		finalCB();
	}
}

export function* addQuotationsEffect(action: CustomerAction): any {
	const { selectedPackages, leadId, total, projectId, successCB, errorCB } = action.payload;
	const transformedData = {
		leadId,
		projectId,
		total,
		areas: selectedPackages
	};
	try {
		const data = yield call(addQuotation, transformedData);
		successCB(data);
	} catch (error: any) {
		errorCB(error?.message);
	}
}

export function* fetchCustomerDetailsEffect(action: CustomerAction): any {
	try {
		const { successCB } = action.payload;
		const { data }: any = yield call(fetchUserDetails);
		yield put({
			type: CustomerActionType.STORE_CUSTOMER_DETAILS,
			payload: {
				...data
			}
		});
		successCB(data);
	} catch (error) {
		yield put({
			type: CustomerActionType.ERROR_CUSTOMER_DETAILS,
			payload: {
				error
			}
		});
	}
}
function transformQuotationRequest(modifiedData) {
	// Group products by areaName
	const groupedByArea = modifiedData.reduce((acc, product) => {
		const { areaName, areaEnum } = product;
		if (!acc[areaName]) {
			acc[areaName] = { areaEnum, areaName, products: [] };
		}
		acc[areaName].products.push(product);
		return acc;
	}, {});

	const areas = Object.keys(groupedByArea).map(areaNameKey => {
		const { areaEnum, areaName, products } = groupedByArea[areaNameKey];

		const transformedProducts = products.map(product => ({
			productName: product.productName,
			unitOfMeasure: product.unitOfMeasure,
			measurement: {
				width: product?.measurement?.width,
				depth: product?.measurement?.depth,
				height: product?.measurement?.height,
				area: product.measurement?.area
			},
			price: product.price,
			productId: product.productId,
			quantity: product.quantity,
			specification: product.specification,
			description: product.description,
			calculation: product.calculation,
			type: product.type,
			productSubCategory: product.productSubCategoryName,
			productCategory: product.productCategoryName
		}));

		const subTotal = transformedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);
		const packageName = transformedProducts[0].type;

		return {
			products: transformedProducts,
			subTotal,
			areaEnum,
			areaName,
			packageName
		};
	});

	return { areas };
}

export function* updateQuotationEffect(action: CustomerAction): any {
	const { areas, successCB, errorCB, leadId, projectId } = action.payload;
	// console.log({ areas });

	const transformedRequest = transformQuotationRequest(areas);
	const total = transformedRequest.areas.reduce((sum, area) => sum + area.subTotal, 0);
	// console.log({ transformedRequest });

	try {
		const { data }: any = yield call(updateQuotation, { ...transformedRequest, total, projectId, leadId });
		const transformedData = {
			...data,
			areas: data?.areas?.map((area: any) => ({
				...area,
				areaName: area.name
			}))
		};

		successCB(transformedData);
	} catch (error: any) {
		errorCB(error?.message);
	}
}

export function* getPredictionIdEffect(action: CustomerAction): any {
	try {
		const { successCB, documentId } = action.payload;
		const { data }: any = yield call(getPredictionId, { documentId });
		yield put({
			type: CustomerActionType.STORE_PREDICTION_ID,
			payload: data.id
		});
		successCB(data);
	} catch (error) {
		yield put({
			type: CustomerActionType.ERROR_CUSTOMER_DETAILS,
			payload: {
				error
			}
		});
	}
}

// export function* getPredictionEffect(action: CustomerAction): any {
// 	try {
// 		const { successCB, predictionId } = action.payload;
// 		const { data }: any = yield call(getPrediction, predictionId);
// 		if (data.status == 'succeeded') {
// 			yield put({
// 				type: CustomerActionType.STORE_AREAS,
// 				payload: data
// 			});
// 		}

// 		successCB(data);
// 	} catch (error) {
// 		yield put({
// 			type: CustomerActionType.ERROR_CUSTOMER_DETAILS,
// 			payload: {
// 				error
// 			}
// 		});
// 	}
// }
export function* getPredictionEffect(action: CustomerAction): any {
	const { successCB, errorCB, id } = action.payload;
	try {
		const { data }: any = yield call(getPrediction, id);

		if (data.status === 'succeeded') {
			yield put({
				type: CustomerActionType.STORE_AREAS,
				payload: data
			});
			successCB && successCB(data);
		} else if (data.status === 'rejected') {
			yield put({
				type: CustomerActionType.PREDICTION_FAILED,
				payload: { error: 'Prediction was rejected.' }
			});
			errorCB && errorCB('Prediction was rejected.');
		} else {
			successCB && successCB(data);
		}
	} catch (error: any) {
		yield put({
			type: CustomerActionType.PREDICTION_FAILED,
			payload: { error }
		});
		errorCB(error.message);
	}
}

export function* getPreDesignQuotationEffect(action: CustomerAction): any {
	const { successCB, selectedAreas, budget, errorCB } = action.payload;

	try {
		const { data }: any = yield call(getPreDesignQuotation, { areas: selectedAreas, budget: budget });

		yield put({
			type: CustomerActionType.STORE_PRE_DESIGN_QUOTATION,
			payload: data
		});
		successCB(data);
	} catch (error: any) {
		yield put({
			type: CustomerActionType.ERROR_PRE_DESIGN_QUOTATION,
			payload: {
				error
			}
		});
		if (errorCB) {
			errorCB(error?.message);
		}
	}
}

export function* getDefaultQuotationsEffect(action: CustomerAction): any {
	const { selectedAreas, budget, errorCB } = action.payload;

	try {
		const { data }: any = yield call(getDefaultQuotations, { areas: selectedAreas, budget: budget });

		yield put({
			type: CustomerActionType.STORE_DEFAULT_QUOTATION,
			payload: data
		});
	} catch (error: any) {
		yield put({
			type: CustomerActionType.ERROR_DEFAULT_QUOTATION,
			payload: {
				error
			}
		});
		if (errorCB) {
			errorCB(error?.message);
		}
	}
}

export function* fetchFloorPlanImageEffect(action: CustomerAction): any {
	const { documentIds, errorCB } = action.payload;

	try {
		const { data }: any = yield call(fetchDocuments, { documentIds: documentIds });
		yield put({
			type: CustomerActionType.STORE_FLOOR_PLAN_IMAGES,
			payload: data
		});
	} catch (error: any) {
		yield put({
			type: CustomerActionType.ERROR_FLOOR_PLAN_IMAGES,
			payload: {
				error
			}
		});
		errorCB(error?.message);
	}
}

export function* fetchQuotationByIdEffect(action: CustomerAction): any {
	const { quotationId, successCB, errorCB } = action.payload;
	try {
		const { data }: any = yield call(fetchQuotationById, quotationId);

		yield put({
			type: CustomerActionType.STORE_QUOTATION_BY_ID,
			payload: data
		});
		if (successCB) successCB(data);
	} catch (error) {
		yield put({
			type: CustomerActionType.ERROR_QUOTATION_BY_ID,
			payload: {
				error
			}
		});
		if (errorCB) {
			errorCB(error?.message);
		}
	}
}

export function* updateFloorPlanSaga(): CustomerSagaFormEffect {
	yield takeLatest(CustomerActionType.UPLOAD_FLOOR_PLAN, updateFloorPlanEffect);
}

export function* sendCustomerOTPSaga(): CustomerSagaFormEffect {
	yield takeLatest(CustomerActionType.SEND_CUSTOMER_OTP, sendCustomerOTPEffect);
}

export function* verifyCustomerOTPSaga(): CustomerSagaFormEffect {
	yield takeLatest(CustomerActionType.VERIFY_CUSTOMER_OTP, verifyCustomerOTPEffect);
}

export function* resendCustomerOTPSaga(): CustomerSagaFormEffect {
	yield takeLatest(CustomerActionType.RESEND_CUSTOMER_OTP, resendCustomerOTPEffect);
}

export function* fetchQuotationsSaga(): CustomerSagaFormEffect {
	yield takeLatest(CustomerActionType.FETCH_QUOTATIONS, fetchQuotationsEffect);
}

export function* addQuotationsSaga(): CustomerSagaFormEffect {
	yield takeLatest(CustomerActionType.ADD_QUOTATION, addQuotationsEffect);
}

export function* fetchCustomerDetailsSaga(): CustomerSagaFormEffect {
	yield takeLatest(CustomerActionType.FETCH_CUSTOMER_DETAILS, fetchCustomerDetailsEffect);
}

export function* updateQuotationSaga(): CustomerSagaFormEffect {
	yield takeLatest(CustomerActionType.UPDATE_QUOTATION, updateQuotationEffect);
}

export function* getPredictionIdSaga(): CustomerSagaFormEffect {
	yield takeLatest(CustomerActionType.GET_PREDICTION_ID, getPredictionIdEffect);
}

export function* getPredictionSaga(): CustomerSagaFormEffect {
	yield takeLatest(CustomerActionType.GET_PREDICTION, getPredictionEffect);
}

export function* getPreDesignQuotationSaga(): CustomerSagaFormEffect {
	yield takeLatest(CustomerActionType.GET_PRE_DESIGN_QUOTATION, getPreDesignQuotationEffect);
}

export function* getDefaultQuotationsSaga(): CustomerSagaFormEffect {
	yield takeLatest(CustomerActionType.GET_DEFAULT_QUOTATION, getDefaultQuotationsEffect);
}
export function* fetchFloorPlanImageSaga(): CustomerSagaFormEffect {
	yield takeLatest(CustomerActionType.FETCH_FLOOR_PLAN_IMAGES, fetchFloorPlanImageEffect);
}

export function* fetchQuotationByIdSaga(): CustomerSagaFormEffect {
	yield takeLatest(CustomerActionType.FETCH_QUOTATION_BY_ID, fetchQuotationByIdEffect);
}

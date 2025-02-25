import { CustomerActionType } from './enums';
import { CustomerState, CustomerAction } from './interfaces';

export const initialState: CustomerState = {
	loading: false,
	error: false,
	leadId: '',
	projectId: '',
	projectName: '',
	leadName: '',
	sessionID: '',
	userDetails: {},
	quotations: [],
	floorPlanDocURL: '',
	predictionId: '',
	predictionStatus: null,
	isPolling: false,
	predictionData: [],
	preDesignQuotation: [],
	budget: '',
	defaultQuotations: {},
	floorPlanImages: [],
	selectedQuotation: {},
	quotationsLoading: false
};

export default (state = initialState, { type, payload }: CustomerAction): CustomerState => {
	switch (type) {
		case CustomerActionType.UPLOAD_FLOOR_PLAN:
			return {
				...state
			};

		case CustomerActionType.SEND_CUSTOMER_OTP:
		case CustomerActionType.VERIFY_CUSTOMER_OTP:
			return {
				...state,
				loading: true
			};

		case CustomerActionType.SEND_CUSTOMER_OTP_FAILED:
		case CustomerActionType.VERIFY_CUSTOMER_OTP_FAILED:
			return {
				...state,
				loading: false,
				error: true
			};

		case CustomerActionType.SEND_CUSTOMER_OTP_SUCCESS:
			return {
				...state,
				sessionID: payload.session_id,
				leadId: payload.lead_id,
				loading: false
			};

		// case CustomerActionType.SET_QUOTATION_ID:
		// 	return {
		// 		...state,
		// 		quotationId: payload
		// 	};

		case CustomerActionType.SET_PROJECT_DETAILS:
			return {
				...state,
				projectId: payload.projectId,
				projectName: payload.projectName,
				floorPlanDocURL: payload?.attachments[0]?.documentUrl,
				budget: payload?.budget
			};

		case CustomerActionType.STORE_PREDICTION_ID:
			return {
				...state,
				predictionId: payload
			};

		case CustomerActionType.SET_LEAD_NAME:
			return {
				...state,
				leadName: payload
			};

		case CustomerActionType.FETCH_QUOTATIONS: {
			return {
				...state,
				quotationsLoading: true
			};
		}

		case CustomerActionType.STORE_QUOTATIONS:
			return {
				...state,
				quotationsLoading: false,
				quotations: payload?.quotations
			};

		case CustomerActionType.RESET_QUOTATIONS:
			return {
				...state,
				quotationsLoading: false,
				quotations: []
			};

		// case CustomerActionType.STORE_AREAS:
		// 	return {
		// 		...state,
		// 		predictionStatus: payload?.status,
		// 		areas: payload?.output?.areas
		// 	};

		case CustomerActionType.GET_PREDICTION: {
			return {
				...state,
				predictionStatus: 'pending',
				error: null,
				isPolling: true
			};
		}

		case CustomerActionType.STORE_AREAS: {
			return {
				...state,
				predictionStatus: 'succeeded',
				predictionData: payload?.output?.analysisJson?.areas,
				isPolling: false
			};
		}

		case CustomerActionType.PREDICTION_FAILED: {
			return {
				...state,
				predictionStatus: 'rejected',
				error: payload.error,
				isPolling: false
			};
		}

		case CustomerActionType.FETCH_CUSTOMER_DETAILS:
			return {
				...state,
				error: false,
				loading: true
			};

		case CustomerActionType.STORE_CUSTOMER_DETAILS:
			return {
				...state,
				error: false,
				loading: false,
				userDetails: payload,
				leadId: payload?.leadId
			};

		case CustomerActionType.ERROR_CUSTOMER_DETAILS:
			return {
				...state,
				error: true,
				loading: false
			};

		case CustomerActionType.STORE_PRE_DESIGN_QUOTATION:
			return {
				...state,
				preDesignQuotation: payload?.quotations
			};

		case CustomerActionType.STORE_DEFAULT_QUOTATION:
			return {
				...state,
				defaultQuotations: payload
			};

		case CustomerActionType.SET_LEAD_AND_PROJECT_ID:
			return {
				...state,
				leadId: payload?.urlLeadId,
				projectId: payload?.urlProjectId
			};

		case CustomerActionType.SET_LEAD_ID:
			return {
				...state,
				leadId: payload?.urlLeadId
			};

		case CustomerActionType.STORE_FLOOR_PLAN_IMAGES:
			return {
				...state,
				floorPlanImages: payload
			};

		case CustomerActionType.STORE_QUOTATION_BY_ID:
			return {
				...state,
				selectedQuotation: payload
			};

		default:
			return state;
	}
};

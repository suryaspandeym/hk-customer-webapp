import { localeSaga, resendOTPSaga, sendOTPSaga, verifyOTPSaga } from './branches/auth/sagas';
import {
	addProjectDetailsSaga,
	fetchQuotationDataSaga,
	getDefaultQuotationsSaga,
	getPreDesignQuotationSaga
} from './branches/project/sagas';

export default [
	localeSaga,
	sendOTPSaga,
	verifyOTPSaga,
	resendOTPSaga,

	//PROJECT
	addProjectDetailsSaga,
	fetchQuotationDataSaga,
	getPreDesignQuotationSaga,
	getDefaultQuotationsSaga
];

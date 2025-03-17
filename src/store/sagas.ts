import { localeSaga, resendOTPSaga, sendOTPSaga, verifyOTPSaga } from './branches/auth/sagas';
import { addProjectDetailsSaga } from './branches/project/sagas';

export default [
	localeSaga,
	sendOTPSaga,
	verifyOTPSaga,
	resendOTPSaga,

	//PROJECT
	addProjectDetailsSaga
];

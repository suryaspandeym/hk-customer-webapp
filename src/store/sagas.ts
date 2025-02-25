
import { localeSaga, resendOTPSaga, sendOTPSaga, verifyOTPSaga } from './branches/auth/sagas';

// export default [loginSaga, logoutSaga, localeSaga, passwordResetSaga];
export default [localeSaga, sendOTPSaga, verifyOTPSaga, resendOTPSaga];

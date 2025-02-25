import { Reducer, combineReducers } from 'redux';

import auth from '@store/branches/auth/reducer';
import customer from '@store/branches/customer/reducer';

export default (): Reducer =>
	combineReducers({
		auth,
		customer
	});

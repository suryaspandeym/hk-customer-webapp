import { Reducer, combineReducers } from 'redux';

import auth from '@store/branches/auth/reducer';
import customer from '@store/branches/customer/reducer';
import project from '@store/branches/project/reducer';

export default (): Reducer =>
	combineReducers({
		auth,
		customer,
		project
	});

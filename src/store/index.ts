import { composeWithDevTools } from '@redux-devtools/extension';
import { Store, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { Saga, SagaMiddleware } from 'redux-saga';

import sagas from './sagas';
import rootReducer from './root-reducer';
import { initialState as auth } from '@store/branches/auth/reducer';
import { initialState as customer } from '@store/branches/customer/reducer';
import { initialState as project } from '@store/branches/project/reducer';

const initialState = {
	auth,
	customer,
	project
};

export const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

export function configureStore(): Store<typeof initialState> {
	const store: Store<typeof initialState> = createStore(
		rootReducer(),
		initialState,
		composeWithDevTools(applyMiddleware(sagaMiddleware))
	);

	sagas.forEach((saga: Saga) => {
		sagaMiddleware.run(saga);
	});

	return store;
}

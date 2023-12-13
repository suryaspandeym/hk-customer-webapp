import * as React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app';
import { removeItems } from '@utilities';
import { AuthActionType } from '@store/enums';
import { configureStore } from '@store/index';
import { PrimeReactProvider } from 'primereact/api';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import { PrimeReactConfig } from './primereact-config';

export const store = configureStore();

const node: HTMLElement | null = document.getElementById('app') || document.createElement('div');
const root = createRoot(node);

const renderRoot = (Application: any): void => {
	root.render(
		<PrimeReactProvider value={PrimeReactConfig}>
			<Provider store={store}>
				<BrowserRouter>
					<Application />
					<ToastContainer />
				</BrowserRouter>
			</Provider>
		</PrimeReactProvider>
	);
};

removeItems();

store.dispatch({ type: AuthActionType.RESET_AUTH });

renderRoot(App);

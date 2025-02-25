import * as React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app';
import { configureStore } from '@store/index';
import { PrimeReactProvider } from 'primereact/api';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import { PrimeReactConfig } from './primereact-config';

// 3rd Party Styling imports
import 'primeicons/primeicons.css'; //icons
// import '@assets/styles/eunomia.min.css';
import 'react-toastify/dist/ReactToastify.min.css';

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

renderRoot(App);

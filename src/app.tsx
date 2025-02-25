import * as React from 'react';
import { Routes, Route, Navigate, RouteObject } from 'react-router-dom';

import * as Loadables from './loadables';
import { Routes as AppRoutes, isLoggedIn } from '@utilities';

// import './assets/styles/index.scss';

export const ROUTES: RouteObject[] = [
	{
		path: AppRoutes.BASE,
		element: <Navigate to={AppRoutes.BASE} replace />
	}
];

export const App = () => (
	<Routes>
		<Route path={AppRoutes.BASE} element={<Loadables.Home />} />
		{!isLoggedIn() ? <Route path={AppRoutes.LOGIN} element={<Loadables.Login />} /> : null}
		{!isLoggedIn() ? <Route path={AppRoutes.SIGNUP} element={<Loadables.Signup />} /> : null}
		{!isLoggedIn() ? <Route path={AppRoutes.PASSWORD_RESET} element={<Loadables.PasswordReset />} /> : null}
		<Route path="*" element={<Loadables.NotFound />} />
	</Routes>
);

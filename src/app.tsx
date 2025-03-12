import * as React from 'react';
import { Routes, Route, Navigate, RouteObject } from 'react-router-dom';

import * as Loadables from './loadables';
import { isLoggedIn } from '@utilities';

import './assets/styles/index.css';
// import AuthProvider from '@providers/AuthProvider';
import { AuthenticatedRoute } from '@components/AuthenticatedRoute';
import AppRoutes from '@utilities/app-routes';
import AuthProvider from '@providers/AuthProvider';

export const ROUTES: RouteObject[] = [
	{
		path: AppRoutes.BASE,
		element: <Navigate to={AppRoutes.BASE} replace />
	},
	{
		path: AppRoutes.NEW_PROJECT,
		element: <Loadables.NewProject />
	},
	{
		path: AppRoutes.MY_ORDERS,
		element: <Loadables.MyOrders />
	},

	{
		path: AppRoutes.PROFILE,
		element: <Loadables.Profile />
	}
];
export const App = () => {
	return (
		<>
			<AuthProvider>
				<Routes>
					<Route path={AppRoutes.BASE} element={<Navigate to={AppRoutes.NEW_PROJECT} />} />

					<Route
						path={AppRoutes.PROFILE}
						element={
							<AuthenticatedRoute>
								<title>Profile</title>
								<Loadables.Profile />
							</AuthenticatedRoute>
						}
					/>
					<Route
						path={AppRoutes.NEW_PROJECT}
						element={
							<AuthenticatedRoute>
								<title>New Project</title>
								<Loadables.NewProject />
							</AuthenticatedRoute>
						}
					/>
					<Route
						path={AppRoutes.MY_ORDERS}
						element={
							<AuthenticatedRoute>
								<title>My Orders</title>
								<Loadables.MyOrders />
							</AuthenticatedRoute>
						}
					/>

					<Route path="*" element={<Navigate to={AppRoutes.BASE} />} />
				</Routes>
			</AuthProvider>
		</>
	);
};

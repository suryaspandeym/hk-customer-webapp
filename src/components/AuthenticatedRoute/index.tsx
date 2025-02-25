import React, { useContext } from 'react';
import authContext from '@contexts/AuthContext';
import { Navigate } from 'react-router';
import RootLayout from '@layouts/RootLayout';
import AppRoutes from '@utilities/app-routes';
import { USER_TYPE } from '@utilities';

export const AuthenticatedRoute = ({ children }: any) => {
	const loggedIn: any = useContext(authContext);
	const userType = localStorage.getItem(USER_TYPE);

	if (!loggedIn.loggedIn) {
		return <Navigate to={AppRoutes.LOGIN} />;
	} else {
		return <RootLayout>{children}</RootLayout>;
	}
};

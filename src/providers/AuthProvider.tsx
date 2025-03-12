import React, { useState, useMemo } from 'react';
import AuthContext from '@contexts/AuthContext';
import { isLoggedIn } from '@utilities';
import { removeItems } from '@utilities/local-storage';
import { useAppSelector } from '@store/selectors';
import AppRoutes from '@utilities/app-routes';

const AuthProvider = ({ children }: any) => {
	const [loggedIn, setLoggedIn] = useState(isLoggedIn());
	const [user, setUser] = useState<any>(useAppSelector(state => state.customer.user));
	const login = () => {
		setLoggedIn(true);
	};
	const logout = (isCustomer = false) => {
		removeItems();
		setUser(null);
		// if (isCustomer) window.location.href = AppRoutes.CUSTOMER_GENERATE_QUOTATION;
		// else
		window.location.href = AppRoutes.LOGIN;
	};

	const value = useMemo(() => {
		return { user, setUser, loggedIn, login, logout };
	}, [user, loggedIn]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

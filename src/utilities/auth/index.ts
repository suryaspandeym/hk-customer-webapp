import ENV from "@utilities/env";
import { getUnixTime } from "date-fns";
import Cookies from "universal-cookie";

import AppRoutes from "../app-routes";
import { REFRESH_TOKEN_KEY, TOKEN_KEY, TOKEN_THRESHOLD_KEY } from "../constants";
import { handleItem, removeItems } from "../local-storage";

const cookies = new Cookies(null, { path: "/" });

export const getAccessToken = (): string => localStorage.getItem(TOKEN_KEY) || "";

export const isLoggedIn = (): boolean => {
	// Add localStorage from cookie
	handleItem(TOKEN_KEY, cookies.get(TOKEN_KEY));
	handleItem(TOKEN_THRESHOLD_KEY, cookies.get(TOKEN_THRESHOLD_KEY));
	handleItem(REFRESH_TOKEN_KEY, cookies.get(REFRESH_TOKEN_KEY));

	const threshold = Number(localStorage.getItem(TOKEN_THRESHOLD_KEY));

	if (!threshold) {
		return false;
	}

	const now = getUnixTime(new Date());

	if (now >= threshold) {
		removeItems();

		window.location.href = AppRoutes.LOGIN;

		return false;
	}

	//   const state =
	//   String(localStorage.getItem("IS_LOGGED_IN")).toLowerCase() === "true";

	return !!getAccessToken() && window.location.pathname !== AppRoutes.LOGIN;
};

export const saveLocale = (locale: string): void => {
	localStorage.setItem("locale", locale);
};

export const setDocumentLang = (locale: string): void => {
	document.documentElement.setAttribute("lang", locale);
};

export const redirectToAuthPage = (mode?: any) => {
	removeItems();
	const currentURL = window.location.href;
	if (mode === "logout") {
		window.location.href = `${ENV.AUTH_BASE_PATH}/login`;
	}
	window.location.href = `${ENV.AUTH_BASE_PATH}/login?redirectTo=${currentURL}`;
};

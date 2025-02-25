import { AuthAction } from '@store/interfaces';
import { add, getUnixTime } from 'date-fns';
import Cookies from 'universal-cookie';

import { REFRESH_TOKEN_KEY, TOKEN_KEY, TOKEN_THRESHOLD_KEY, USER_TYPE } from './constants';
import ENV from './env';

export const setThreshold = (time: number): string =>
	getUnixTime(
		add(new Date(), {
			seconds: time || 3600
		})
	).toString();

export const handleItem = (key: string, value?: string): void => {
	if (value) {
		localStorage.setItem(key, value);
	} else {
		localStorage.removeItem(key);
	}
};

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const setItems = (data: AuthAction['payload']): void => {
	handleItem(TOKEN_KEY, data!.access_token);
	handleItem(TOKEN_THRESHOLD_KEY, setThreshold(data!.expiry_time!));
	handleItem(REFRESH_TOKEN_KEY, data!.refresh_token);
	handleItem(USER_TYPE, data!.user_type);
	const cookies = new Cookies('LOGIN', { domain: ENV.AUTH_BASE_DOMAIN });
	cookies.set(TOKEN_KEY, data!.access_token, {
		domain: ENV.AUTH_BASE_DOMAIN,
		expires: new Date(data!.expiry_time!)
	});
	// cookies.set(REFRESH_TOKEN_KEY, data!.refreshToken, {
	// 	domain: ENV.AUTH_BASE_DOMAIN,
	// 	expires: new Date(data!.refreshTokenExpiryTime!)
	// });
	cookies.set(TOKEN_THRESHOLD_KEY, setThreshold(data!.expiry_time!), {
		domain: ENV.AUTH_BASE_DOMAIN,
		expires: new Date(data!.expiry_time!)
	});
};
/* eslint-enable @typescript-eslint/no-non-null-assertion */

export const removeItems = (): void => {
	handleItem(TOKEN_KEY);
	handleItem(TOKEN_THRESHOLD_KEY);
	handleItem(REFRESH_TOKEN_KEY);

	const cookies = new Cookies('LOGIN', { domain: ENV.AUTH_BASE_DOMAIN });
	cookies.remove(TOKEN_KEY, { domain: ENV.AUTH_BASE_DOMAIN });
	cookies.remove(REFRESH_TOKEN_KEY, { domain: ENV.AUTH_BASE_DOMAIN });
	cookies.remove(TOKEN_THRESHOLD_KEY, { domain: ENV.AUTH_BASE_DOMAIN });
	cookies.remove(USER_TYPE, { domain: ENV.AUTH_BASE_DOMAIN });
};

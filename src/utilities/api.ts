import axios, { type AxiosResponse, type AxiosRequestConfig } from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

import { removeItems, setItems } from './local-storage';
import { API_URL, REFRESH_TOKEN_KEY, TOKEN_KEY, SOURCE_HEADERS } from './constants';
import AppRoutes from './app-routes';

export const http = applyCaseMiddleware(
	axios.create({
		baseURL: API_URL,
		headers: {
			Vary: '*',
			Accept: 'application/json'
		}
	})
);

export const post = async (endpoint: string, data?: unknown): Promise<AxiosResponse> => {
	return await new Promise((resolve, reject) => {
		http.post(endpoint, data)
			.then(resolve)
			.catch(e => {
				reject(e.response.data);
			});
	});
};

export const get = async (endpoint: string, queryParams?: Record<string, unknown>): Promise<AxiosResponse> => {
	let config: AxiosRequestConfig = {
		data: {}
	};
	if (queryParams) {
		config = { ...config, params: queryParams };
	}
	return await new Promise((resolve, reject) => {
		http.get(endpoint, config)
			.then(resolve)
			.catch(e => {
				reject(e.response?.data);
			});
	});
};

export const patch = async <T>(endpoint: string, data: T): Promise<AxiosResponse> =>
	await new Promise((resolve, reject) => {
		http.patch(endpoint, data)
			.then(resolve)
			.catch(e => {
				reject(e.response?.data);
			});
	});
export const put = async <T>(endpoint: string, data?: T): Promise<AxiosResponse> =>
	await new Promise((resolve, reject) => {
		http.put(endpoint, data)
			.then(resolve)
			.catch(e => {
				reject(e.response.data);
			});
	});

export const postWithoutToken = async (endpoint: any, data?: any, config?: any): Promise<AxiosResponse> => {
	let headers = {};
	if (config.addSourceHeader) {
		headers = { ...headers, [SOURCE_HEADERS[0]]: SOURCE_HEADERS[1] };
	}
	return await axios.post(API_URL + '/' + endpoint, data, {
		headers: { ...headers }
	});
};
export const fileUploadWithoutToken = async (endpoint: any, file: File, config?: any): Promise<AxiosResponse> => {
	let headers: any = {
		'Content-Type': file.type
	};
	if (config?.headers && config.headers.file !== '') {
		headers = {
			...headers,
			'x-amz-meta-filename': config.headers.file
		};
	}

	return await new Promise((resolve, reject) => {
		axios
			.put(endpoint, file, {
				headers: { ...headers }
			})
			.then(resolve)
			.catch(e => {
				reject(e);
			});
	});
};

export const fetchHeadObjFromURL = async (endpoint: any) => {
	return await new Promise((resolve, reject) => {
		axios
			.get(endpoint, {
				headers: {
					Range: 'bytes=0-0'
				}
			})
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

http.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		if (config.headers) {
			config.headers.Authorization = 'Bearer ' + localStorage.getItem(TOKEN_KEY) || '';
		}

		return config;
	},
	async (error: any) => await Promise.reject(error)
);

http.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error: any) => {
		const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
		if (!refreshToken) {
			return (window.location.href = AppRoutes.LOGIN);
		}

		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			if (http.defaults.headers) {
				(http.defaults.headers as any).Authorization = 'Bearer ' + refreshToken;
			}

			// return;

			return await postWithoutToken(
				'auth/refresh-token',
				{
					token: refreshToken
				},
				{ addSourceHeader: true }
			)
				.then(async (res: any) => {
					setItems(res.data.auth_response);
					/*eslint-disable*/
					const { access_token } = res.data.auth_response;
					if (http.defaults.headers) {
						(http.defaults.headers as any)['Authorization'] = access_token;
					}
					/* eslint-enable */

					return await http(originalRequest);
				})
				.catch(() => {
					removeItems();
					window.location.href = AppRoutes.LOGIN;
				});
		}

		return await Promise.reject(error);
	}
);

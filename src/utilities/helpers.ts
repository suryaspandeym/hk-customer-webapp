import { getUnixTime, format, isValid } from 'date-fns';

import AppRoutes from './app-routes';
import { removeItems } from './local-storage';
import { TOKEN_KEY, TOKEN_THRESHOLD_KEY } from './constants';
import { timestampToDate } from './date';
import { generatePath } from 'react-router';
import { createSearchParams } from 'react-router-dom';
import { isDocFile, toast } from '@utilities';
import { type AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import queryString from 'query-string';

export const getAccessToken = (): string => localStorage.getItem(TOKEN_KEY) ?? '';

export const isLoggedIn = (): boolean => {
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

	return !!getAccessToken();
};

export const saveLocale = (locale: string): void => {
	localStorage.setItem('locale', locale);
};

export const setDocumentLang = (locale: string): void => {
	document.documentElement.setAttribute('lang', locale);
};

export const renderAddress = (address: any) => {
	const addr: any = [];

	if (address.addressLine1) addr.push(address.addressLine1);
	if (address.addressLine2) addr.push(address.addressLine2);
	if (address.district) addr.push(address.district);
	if (address.city) addr.push(address.city);
	if (address.state) addr.push(address.state);
	if (address.country) addr.push(address.country);
	if (address.pincode) addr.push(address.pincode);

	return addr.join(', ');
};

export const epochToDateRange = (startDateTimestamp: any, endDateTimestamp: any, type = 'OBJECT') => {
	const startDate = timestampToDate(startDateTimestamp);
	const endDate = timestampToDate(endDateTimestamp);
	return type === 'ARRAY'
		? [startDate || null, endDate || null]
		: { startDate: timestampToDate(startDateTimestamp), endDate: timestampToDate(endDateTimestamp) };
};

export const timestampToFormattedDate = (timestamp: number | string | undefined, dateFormat: string) => {
	return timestamp !== undefined && isValid(timestamp) ? format(new Date(timestamp), dateFormat) : '';
};

export const goBack = (navigate: any) => {
	navigate('..', { relative: 'path' });
};

export const handleEmptyNullValues = (obj: any) => {
	const ignores = [null, undefined, '', [], {}];
	const isNonEmpty = (d: any) => !ignores.includes(d) && (typeof d !== 'object' || Object.keys(d).length);

	return JSON.parse(JSON.stringify(obj), function (k, v) {
		if (isNonEmpty(v)) return v;
	});
};

export const navigateTo = (navigate: any, path: any, pathParams: any, queryParams?: any, options: any = {}) => {
	const navigationPath = generatePath(path, pathParams);
	navigate({
		...options,
		pathname: navigationPath,
		search: createSearchParams(queryParams).toString()
	});
};

export const searchAction = (dispatch: any, event: AutoCompleteCompleteEvent, action: any) => {
	const prefix = event.query;

	dispatch({
		type: action,
		payload: {
			prefix,
			errorCB: (message: string) => {
				toast('ERROR', message);
			}
		}
	});
};

export const transformFullName = (obj: any, firstNameKey: string, lastNameKey: string, phoneNumberKey?: string) => {
	const firstName = obj?.[firstNameKey] ? obj[firstNameKey] : '';
	const lastName = obj?.[lastNameKey] ? obj[lastNameKey] : '';
	const phoneNumber = obj && phoneNumberKey && obj[phoneNumberKey] ? obj[phoneNumberKey] : '';
	return `${firstName} ${lastName} ${phoneNumber ? `(${phoneNumber})` : ''}`.trim();
};

export const sanitizeValue = (value: any) => {
	return value.replace(/\s+/g, ' ').replace(/\n+/g, ' ').trim();
};

export const handleSortingValues = (obj: any, sortEnum: any) => {
	let newObj = { ...obj };
	switch (obj.sortOrder) {
		case 1:
			newObj = { ...obj, sortByOrder: 'ASC', sortByField: sortEnum[obj.sortField] };
			delete newObj.sortField;
			delete newObj.sortOrder;
			break;
		case -1:
			newObj = { ...obj, sortByOrder: 'DESC', sortByField: sortEnum[obj.sortField] };
			delete newObj.sortField;
			delete newObj.sortOrder;
			break;
		default:
			newObj = { ...obj };
	}

	return newObj;
};

export const convertSearchParamsToFilters = (searchParams: any, FILTERS: any) => {
	const filters: any = {};
	const parsed = queryString.parse(searchParams.toString(), { arrayFormat: 'bracket' });

	Object.keys(parsed).forEach((key: any) => {
		const filterConfig = FILTERS[key];
		if (filterConfig) {
			if (FILTERS[key]?.type == 'DateRange') {
				const range = (parsed[key] as string[]).map((v: string) => {
					return !!v ? parseInt(v, 10) : null;
				});
				filters[key] = epochToDateRange(range[0], range[1], 'ARRAY');
			} else if (filterConfig.type === 'Array' && filterConfig.item === 'Object') {
				const values = parsed[key];

				if (Array.isArray(values)) {
					filters[key] = values.map((val: any) => {
						return (
							filterConfig.options?.find((option: any) => option.value === val) || {
								value: val,
								label: val
							}
						);
					});
				} else {
					filters[key] = [
						filterConfig.options?.find((option: any) => option.value === values) || {
							value: values,
							label: values
						}
					];
				}
			} else if (filterConfig.type === 'Autocomplete') {
				const values = parsed[key];

				if (Array.isArray(values)) {
					filters[key] = values.map((val: any) => JSON.parse(val));
				} else {
					filters[key] = [JSON.parse(values as string)];
				}
			} else {
				filters[key] = parsed[key];
			}
		}
	});

	return filters;
};

export const convertFiltersToSearchParams = (selectedFilters: any, setSearchParam: any, FILTERS: any) => {
	const cleanedFilters = handleEmptyNullValues(selectedFilters);
	if (cleanedFilters == null) {
		setSearchParam('');
		return '';
	}
	const filters: any = {};
	Object.keys(cleanedFilters).forEach((key: any) => {
		if (FILTERS[key]?.type === 'DateRange') {
			const startDate = cleanedFilters[key][0];
			const endDate = cleanedFilters[key][1];
			filters[key] = [new Date(startDate)?.getTime() ?? null, new Date(endDate)?.getTime() ?? null];
		} else if (FILTERS[key]?.type === 'Object') {
			filters[key] = JSON.stringify(cleanedFilters[key]);
		} else if (FILTERS[key]?.type === 'Array' && FILTERS[key].item === 'Object') {
			filters[key] = cleanedFilters[key].map((filterObj: any) => filterObj.value || filterObj.key);
		} else if (FILTERS[key]?.type === 'Autocomplete') {
			filters[key] = cleanedFilters[key].map((obj: any) => {
				return JSON.stringify(obj);
			});
		} else {
			filters[key] = cleanedFilters[key];
		}
	});
	const searchParams = queryString.stringify(filters, { arrayFormat: 'bracket' });
	setSearchParam(searchParams);
	return searchParams;
};

export const isShallowEqual = (v: { [x: string]: any }, o: { [x: string]: any }) => {
	for (const key in v) if (!(key in o) || v[key] !== o[key]) return false;
	for (const key in o) if (!(key in v) || o[key] !== v[key]) return false;
	return true;
};

export const navigateToExternalLink = (url: string) => {
	window.location.href = url;
};

export function transformUploadData(values: any, currentFileType: any) {
	const transformedData = {
		document: [
			{
				...values,
				// files: values.files.map((file: any) => {
				files: (Array.isArray(values.files) ? values.files : values.files.files).map((file: any) => {
					return {
						fileName: file.name,
						fileType: currentFileType,
						...(isDocFile(file, file.type) || isDocFile(file.type) ? {} : { thumbnailFileName: file.name })
						// link: FILE_TYPE_KEYS.LINK && file.link
					};
				})
			}
		]
	};

	return transformedData;
}

export const handleDownload = async fileUrl => {
	try {
		const response = await fetch(fileUrl, { mode: 'cors' });
		if (!response.ok) throw new Error('Network response was not ok');

		const blob = await response.blob();
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = fileUrl.split('/').pop();
		link.click();
		window.URL.revokeObjectURL(url);
	} catch (error) {
		toast('ERROR', 'Failed to download the file. Please try again.');
	}
};

export const renderFileUploadControl = () => {
	const accept = 'image/*,application/pdf';
	const showUploadControl = true;
	return {
		accept,
		showUploadControl
	};
};

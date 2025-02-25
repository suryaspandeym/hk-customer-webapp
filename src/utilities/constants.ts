import ENV from './env';
import * as Yup from 'yup';
export const API_URL = ENV.API_BASE_PATH;

export enum WIDTH_KEYS {
	XS = 'XS',
	SM = 'SM',
	MD = 'MD',
	LG = 'LG',
	XL = 'XL',
	XXL = 'XXL',
	XXXL = 'XXXL'
}

export const SOURCE_HEADERS = ['x-source-id', '24680'];
export const TOKEN_KEY = 'access-token';
export const REFRESH_TOKEN_KEY = 'refresh-token';
export const TOKEN_THRESHOLD_KEY = 'access-token-threshold';
export const USER_TYPE = 'user-type';

/* eslint-disable */
export const EMAIL_REGEX =
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
export const PASSWORD_REGEX = /.{8,}/;
export const PHONE_REGEX = /^[0-9]{10}$/;
export const OTP_REGEX = /^[0-9]{6}$/;
export const YOUTUBE_LINK_REGEX =
	/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:v\/|embed\/|watch\?v=)|youtu\.be\/)([^\s&?/]+)/;
/* eslint-enable */

export const noop = (...arg: any): void => {
	// Do Nothing
};

// 26 Aug 2023, 09:33 PM
export const DATE_FNS_TIME_FORMAT = 'dd LLL yyyy, hh:mm aa';

export enum COLOR_KEYS {
	PRIMARY = '#064fd4',
	SECONDARY = '#64748b',
	SUCCESS = '#22c55e', // green
	INFO = '#0ea5e9',

	HELP = '#a855f7', // purple
	PROGRESS = '#0d3b66', // blue

	WARNING = '#ee964b', // yellow
	CRITICAL = '#f95738', // orange
	DANGER = '#ff3232', // red

	TERMINAL = '#a57548' // off-white
}

export const REQUIRED_MESSAGE = 'This field is required';
export const SINGLE_SELECT_FIELD_VALIDATION = Yup.object();
export const DOCUMENT_UPLOAD_MAX_SIZE = 10485760; // 10 MB
export const FILE_UPLOAD_MESSAGE = 'Drag and drop here to upload files or choose';

export enum UPLOAD_TYPE_KEYS {
	UPLOAD_VIDEO = 'UPLOAD_VIDEO',
	YOUTUBE_LINK = 'YOUTUBE_LINK',
	DOCUMENT = 'DOCUMENT'
}

export const UPLOAD_TYPES = {
	[UPLOAD_TYPE_KEYS.UPLOAD_VIDEO]: {
		key: UPLOAD_TYPE_KEYS.UPLOAD_VIDEO,
		label: 'Upload Video'
	},
	[UPLOAD_TYPE_KEYS.YOUTUBE_LINK]: {
		key: UPLOAD_TYPE_KEYS.YOUTUBE_LINK,
		label: 'Youtube Link'
	},
	[UPLOAD_TYPE_KEYS.DOCUMENT]: {
		key: UPLOAD_TYPE_KEYS.DOCUMENT,
		label: 'Document'
	}
};

export enum REFERENCE_TYPE_KEYS {
	PRODUCT = 'PRODUCT',
	INSPIRATION = 'INSPIRATION',
	PROJECT = 'PROJECT'
}

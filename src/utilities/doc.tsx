import { YOUTUBE_LINK_REGEX } from './constants';

export enum IMAGE_FILE_TYPES {
	JPG = '.jpg',
	JPEG = '.jpeg',
	PNG = '.png',
	WEBP = '.webp'
}

export enum DOC_FILE_TYPES {
	PDF = '.pdf',
	DOC = '.doc'
}

export enum DOCUMENT_TYPES {
	BUILDER = 'BUILDER',
	PROJECT = 'PROJECT',
	PROPERTY = 'PROPERTY',
	CUSTOMER = 'CUSTOMER'
}

export enum UPLOAD_DOC_TYPES {
	'PDF' = 'application/pdf'
}

export enum IMAGE_CONTENT_TYPES {
	JPG = 'image/jpg',
	JPEG = 'image/jpeg',
	PNG = 'image/png',
	WEBP = 'image/webp'
}

const imageContentTypes = [
	IMAGE_CONTENT_TYPES.JPG,
	IMAGE_CONTENT_TYPES.JPEG,
	IMAGE_CONTENT_TYPES.PNG,
	IMAGE_CONTENT_TYPES.WEBP
];

export const isBlobFile = (file: any) => {
	return !!file.documentUrl.startsWith('blob:');
};

export const isDocFile = (file: any, type?: string) => {
	return (
		(!!file && type === UPLOAD_DOC_TYPES.PDF) ||
		(!!file && file.docContentType === UPLOAD_DOC_TYPES.PDF) ||
		!!file.fileName?.match(DOC_FILE_TYPES.PDF) ||
		!!file.fileName?.match(DOC_FILE_TYPES.DOC)
	);
};

export const isYoutubeLink = (url: string) => {
	return !!url.match(YOUTUBE_LINK_REGEX);
};

export const isImgFile = (file: any) => {
	// ;
	return (
		!!file.fileName?.match(IMAGE_FILE_TYPES.JPG) ||
		(!!file && imageContentTypes.includes(file.docContentType)) ||
		!!file.fileName?.match(IMAGE_FILE_TYPES.JPEG) ||
		!!file.fileName?.match(IMAGE_FILE_TYPES.PNG) ||
		!!file.fileName?.match(IMAGE_FILE_TYPES.WEBP)
	);
};

export const fileNameFromURL = (url: string) => {
	return (url.match(/^\w+:(\/+([^\/#?\s]+)){2,}(#|\?|$)/) || [])[2] || '';
};

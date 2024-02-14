import { format, isValid, startOfDay } from "date-fns";

// 26/01/2023, 09:33 PM
export const DATE_FNS_TIME_FORMAT = "dd/MM/yy, hh:mm aa";
export const DATE_FNS_TIME_ONLY_FORMAT = "mm:ss";
export const DATE_FNS_FORMAT = "dd/MM/yy";

export const PRIME_REACT_DATE_FORMAT = "dd/mm/yy";

export const timestampToFormattedDate = (timestamp: number | string | undefined, dateFormat: string = DATE_FNS_FORMAT) => {
	return timestamp !== undefined && isValid(timestamp) ? format(new Date(timestamp), dateFormat) : "";
};

export const epochToDateRange = (date: any) => {
	return { startDate: timestampToFormattedDate(date, "DD MMM, YYYY"), endDate: timestampToFormattedDate(date, "DD MMM, YYYY") };
};

export const getStartOfDay = (date: any) => {
	return startOfDay(new Date(date)).getTime();
};

export const formatDateRange = (startDate: Date | null, endDate: Date | null): string => {
	const sD = timestampToFormattedDate(startDate?.getTime(), DATE_FNS_FORMAT);
	const eD = timestampToFormattedDate(endDate?.getTime(), DATE_FNS_FORMAT);

	if (startDate !== null && endDate !== null) {
		return `${sD} ${eD ? `to ${eD}` : ""}`;
	} else if (startDate !== null) {
		return `from ${sD}`;
	} else if (endDate !== null) {
		return `to ${eD}`;
	} else return ``;
};

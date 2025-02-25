import {
	addMinutes,
	format,
	intervalToDuration,
	isSaturday,
	isValid,
	nextSaturday,
	nextSunday,
	startOfDay,
	startOfToday
} from 'date-fns';

export const DATE_FNS_TIME_FORMAT = "dd MMM ''yy hh:mm aa";
export const DATE_FNS_TIME_EXTENDED_FORMAT = 'dd/MM/yy, hh:mm:ss aa';
export const DATE_FNS_TIME_ONLY_FORMAT = 'mm:ss';
export const DATE_FNS_FORMAT = 'dd/MM/yy';
export const DATE_FNS_TIME_ONLY_EXTENDED_FORMAT = 'hh:mm a';

export const PRIME_REACT_DATE_FORMAT = 'dd/mm/y';

export const timestampToDate = (timestamp: number | string | undefined) =>
	timestamp !== undefined && isValid(timestamp) ? new Date(timestamp) : '';

export const timestampToFormattedDate = (
	timestamp: number | string | undefined,
	dateFormat: string = DATE_FNS_FORMAT
) => {
	const timestampDate = timestampToDate(timestamp);
	return timestampDate !== '' ? format(timestampDate, dateFormat) : '';
};

export const epochToDateRange = (startDateTimestamp: any, endDateTimestamp: any, type = 'OBJECT') => {
	const startDate = timestampToDate(startDateTimestamp);
	const endDate = timestampToDate(endDateTimestamp);
	return type === 'ARRAY'
		? [!!startDate ? startDate : null, !!endDate ? endDate : null]
		: { startDate: timestampToDate(startDateTimestamp), endDate: timestampToDate(endDateTimestamp) };
};

export const epochToDate = (timestamp?: number | string) => {
	return timestamp !== undefined && isValid(timestamp) ? new Date(timestamp) : new Date();
};

export const getStartOfDay = (date: any) => {
	return startOfDay(new Date(date)).getTime();
};

export const formatDateRange = (startDate: Date | null, endDate: Date | null): string => {
	const sD = timestampToFormattedDate(startDate?.getTime(), DATE_FNS_FORMAT);
	const eD = timestampToFormattedDate(endDate?.getTime(), DATE_FNS_FORMAT);

	if (startDate !== null && endDate !== null) {
		if (sD === eD) return `${sD}`;
		return `${sD} ${eD ? `to ${eD}` : ''}`;
	} else if (startDate !== null) {
		return `from ${sD}`;
	} else if (endDate !== null) {
		return `to ${eD}`;
	} else return ``;
};

export const getNextWeekendDate = () => {
	const today = new Date().setHours(10, 0);
	if (isSaturday(today)) {
		return nextSunday(today);
	} else {
		return nextSaturday(today);
	}
};

export const formatSecondsToDuration = (seconds: number) => {
	const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
	return [duration.minutes, duration.seconds]
		.map((num: number | undefined) => String(num).padStart(2, '0'))
		.join(':');
};

export const formatSecondsToHoursMinutesSecondsDuration = (seconds: number) => {
	const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

	const formattedDuration = [
		String(duration.hours).padStart(2, '0'),
		String(duration.minutes).padStart(2, '0'),
		String(duration.seconds).padStart(2, '0')
	].join(':');

	return formattedDuration;
};

export interface TimeValue {
	hour: number;
	minute: number;
}

export interface TimeOption {
	label: string;
	value: TimeValue;
}

export const generateTimeOptions = (hourInterval: number, minuteInterval: number): TimeOption[] => {
	const timeOptions: TimeOption[] = [];
	const startOfDay = new Date(startOfToday());

	for (let h = 0; h < 24; h += hourInterval) {
		for (let m = 0; m < 60; m += minuteInterval) {
			const minutesSinceStart = h * 60 + m;
			const currentTime = addMinutes(startOfDay, minutesSinceStart);
			const formattedTime = format(currentTime, DATE_FNS_TIME_ONLY_EXTENDED_FORMAT);
			const value: TimeValue = {
				hour: h,
				minute: m
			};
			timeOptions.push({ label: formattedTime, value: value });
		}
	}

	return timeOptions;
};

export const groupByDate = (activities: any, key: string) => {
	const groupedActivities = activities.reduce((acc: any, activity: any) => {
		const date = format(activity[key], 'dd/MM/yyyy');
		if (!acc[date]) {
			acc[date] = [];
		}
		acc[date].push(activity);
		return acc;
	}, {});

	return Object.keys(groupedActivities).map(date => ({
		date,
		activities: groupedActivities[date]
	}));
};

export const formatDateOnly = (timestamp: any) => {
	if (!timestamp) {
		return;
	}
	const dayOfWeek = format(timestamp, 'EEEE');
	const monthDay = format(timestamp, 'do MMMM');

	return `${dayOfWeek}, ${monthDay}`;
};

export const formatTimeOnly = (timestamp: any) => {
	return format(timestamp, 'p');
};

export const groupFormatDateOnlyByDate = (items: any) => {
	return items.reduce((acc, item) => {
		const date = formatDateOnly(item.callStartTime);
		if (!acc[date]) {
			acc[date] = [];
		}
		acc[date].push(item);
		return acc;
	}, {});
};

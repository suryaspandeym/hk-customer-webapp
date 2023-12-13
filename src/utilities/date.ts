import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const relativeTimeAgo = (dateEpoch: string | number) => dayjs().to(dayjs(dateEpoch)).toString();
export const dateFormatDDMMYYYY = (dateEpoch: string | number) => dayjs(dateEpoch).format("DD MMM, YYYY");
export const dateFormatDDMMYYYYhhmma = (dateEpoch: string | number) => dayjs(dateEpoch).format("DD MMM, YYYY hh:mm a");

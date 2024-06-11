export const formatVisibleFilterKeys = (filterKey: any) => {
	return filterKey.replace(/([a-z])([A-Z])/g, "$1 $2");
};

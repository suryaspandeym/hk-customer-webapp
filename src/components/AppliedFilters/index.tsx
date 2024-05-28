import React from "react";
import { ChipSection } from "@components/ChipSection";
import { formatVisibleFilterKeys } from "@utilities/formatFilterVisibleKeys";

interface AppliedFiltersProps {
	filterType: string;
	filterKey?: string;
	filterValues: any;
	onClick: () => void;
	format?: any;
	range?: boolean;
}

const AppliedFilters: React.FC<AppliedFiltersProps> = ({ filterType, filterValues, filterKey, onClick, format, range = false }) => {
	if (typeof filterValues === "number") {
		filterValues = filterValues.toString();
	}

	if (!filterValues || (Array.isArray(filterValues) && filterValues.length === 0)) {
		return null;
	}
	const renderChips = () => {
		if (Array.isArray(filterValues) && !range) {
			return filterValues?.map((filterValue: any, idx: number) => (
				<ChipSection key={idx} filterKey={filterKey} filterValue={filterValue} onClick={onClick} format={format} />
			));
		} else {
			return <ChipSection key={filterKey} filterValue={filterValues} filterKey={filterKey} onClick={onClick} format={format} />;
		}
	};

	return (
		<div className="border-solid border-2 rounded p-2 grow">
			<span className="font-bold capitalize">{`${formatVisibleFilterKeys(filterType)} :`}</span>
			<div className="flex gap-4 flex-wrap">{renderChips()}</div>
		</div>
	);
};

export default AppliedFilters;

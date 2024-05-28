import React from "react";

import { Chip } from "primereact/chip";

export const ChipSection = ({ filterKey, filterValue, onClick, format = (inp: any) => inp }: any) => {
	return (
		<Chip
			className="cursor-pointer"
			key={filterValue}
			label={!!filterKey ? format(filterValue[filterKey]) : format(filterValue)}
			pt={{
				root: {
					className: "bg-[#dfdbdb7a] rounded px-1 py-0"
				},
				label: { className: "mb-1 mt-1 text-sm" }
			}}
			onClick={onClick}
		></Chip>
	);
};

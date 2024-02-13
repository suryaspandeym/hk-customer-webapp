import React from "react";

import { Column } from "primereact/column";

export const columnConfiguration = (COLUMNS: any) => {
	return COLUMNS.map((r: any, idx: any) => (
		<Column
			key={idx}
			field={r.field}
			header={r.header}
			{...(r.body ? { body: (rowData) => r.body(rowData) } : {})}
			headerStyle={{ background: "#3f51b5", color: "white", whiteSpace: "nowrap" }}
			{...(r.sortable ? { sortable: true } : null)}
			{...(r.pt ? { pt: r.pt } : null)}
		/>
	));
};

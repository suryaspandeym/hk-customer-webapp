import React from 'react';

import { Column } from 'primereact/column';

export const onPage = (setState: React.Dispatch<React.SetStateAction<any>>) => {
	return (state: any) => {
		setState((prev: any) => ({
			...prev,
			first: state.first,
			offset: state.page,
			pageSize: state.rows
		}));
	};
};

export const onSort = (setState: React.Dispatch<React.SetStateAction<any>>) => {
	return (state: any) => {
		setState((prev: any) => {
			return {
				...prev,
				sortField: state.sortField,
				sortOrder: state.sortOrder
			};
		});
	};
};

export const columnConfiguration = (COLUMNS: any) => {
	return COLUMNS.map((r: any, idx: any) => (
		<Column
			key={idx}
			field={r.field}
			header={r.header}
			{...(r.body ? { body: rowData => r.body(rowData) } : {})}
			headerStyle={{ whiteSpace: 'nowrap', ...r.headerStyle }}
			{...(r.sortable ? { sortable: true } : null)}
			{...(r.pt ? { pt: r.pt } : null)}
			{...(r.frozen ? { frozen: r.frozen } : null)}
			{...(r.align ? { align: r.align } : null)}
		/>
	));
};

export const dataTableConfiguration = {
	className: 'text-sm md:text-lg',
	stripedRows: true,
	lazy: true,
	paginator: true,
	rowsPerPageOptions: [10, 25, 50],
	paginatorTemplate: 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown',
	currentPageReportTemplate: '{first} to {last} of {totalRecords}',
	pt: {
		thead: {
			className: 'text-base'
		},
		tbody: {
			className: 'text-base'
		},
		bodyrow: { className: 'hover:none' },
		paginator: {
			RPPDropdown: {
				root: {
					className: 'items-center'
				}
			}
		}
	}
};

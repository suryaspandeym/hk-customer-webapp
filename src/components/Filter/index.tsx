import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { AutoComplete } from 'primereact/autocomplete';
import { Calendar } from 'primereact/calendar';
import { PRIME_REACT_DATE_FORMAT } from '@utilities/date';
import React, { useState } from 'react';
import CustomTooltip from '@components/CustomToolTip';
import { Chips } from 'primereact/chips';
interface FilterProps {
	filterObj: any;
	selectedFilterObj: any;
	onApply?: () => void;
	showFilter?: (filterKey: string) => boolean;
	onClick?: () => void;
	handleAutoCompleteChange?: (key, value) => void;
	showClearButton: any;
}
export const Filter: React.FC<FilterProps> = ({
	filterObj,
	selectedFilterObj,
	onApply,
	showFilter = () => false,
	onClick,
	handleAutoCompleteChange,
	showClearButton
}: any) => {
	const [selectedValues, setSelectedValues] = useState<any>({});

	const handleCustomDateRangeChange = (filterKey: string, value: any) => {
		const newSelectedValues = { ...selectedValues, [filterKey]: value };
		setSelectedValues(newSelectedValues);
		filterObj.find((filter: any) => filter.key === filterKey).onOptionsClick(filterKey, value);
	};
	return (
		<div>
			<div className="flex justify-between items-center">
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-1 ">
					{filterObj?.map((filter: any) => {
						if (!showFilter(filter?.key)) return null;
						const { type, label, key, multiple } = filter;
						if (type === 'multi-select') {
							const { options, onOptionsClick } = filter;
							return (
								<div key={key} className="flex flex-col">
									<label className="w-36 pl-1 font-bold">{label}</label>
									<MultiSelect
										value={selectedFilterObj[key]?.map((option: any) => option?.value)}
										onChange={e => {
											onOptionsClick(key, e);
										}}
										options={options}
										optionLabel="label"
										className="ml-1 w-52 h-[37px] rounded border border-solid border-[#CACACA]"
										pt={{ root: { className: 'hover:border-primary' } }}
									/>
								</div>
							);
						}
						if (type === 'dropdown') {
							const { options } = filter;
							return (
								<div key={key} className="flex flex-col">
									<span className="flex justify-between">
										<label className="w-36 pl-1 font-bold">{label}</label>
										{filter?.customToolTip && (
											<CustomTooltip
												content={filter?.customToolTipMessage}
												iconClass="pi pi-info-circle"
											/>
										)}
									</span>

									<div className="flex relative">
										<Dropdown
											value={selectedFilterObj[key]}
											onChange={e => {
												filter.onOptionsClick(key, e.value);
											}}
											optionLabel="label"
											options={options}
											// disabled={filter?.isDisabled}
											className="ml-1 w-52 h-[37px] rounded border border-solid border-[#CACACA]"
										/>
										{selectedFilterObj[key] && (
											<button
												className="pi pi-times p-button-text bg-transparent absolute right-7 top-1/3 hover:bg-none"
												title="Clear"
												onClick={() => {
													filter.onOptionsClick(key, null);
												}}
											/>
										)}
									</div>
								</div>
							);
						}
						if (type === 'autocomplete') {
							return (
								<div key={key} className="flex flex-col">
									<label className="w-36 pl-1 font-bold">{label}</label>
									<AutoComplete
										forceSelection
										minLength={3}
										multiple
										suggestions={filter.autocompleteSuggestions || []}
										selectionLimit={multiple || 1}
										value={selectedFilterObj[key]}
										onChange={e => {
											handleAutoCompleteChange(key, e.value);
										}}
										pt={{ container: { className: 'overflow-scroll' } }}
										completeMethod={filter.onCompleteMethod}
										field={filter.displayField}
										className="ml-1 w-52 h-[37px] rounded border-solid border-[#CACACA] [&>input]:w-full"
									/>
								</div>
							);
						}
						if (type === 'calendar') {
							return (
								<div key={key} className="flex flex-col">
									<label className="min-w-36 pl-1 font-bold">{label}</label>
									<Calendar
										value={selectedFilterObj[key]}
										dateFormat={PRIME_REACT_DATE_FORMAT}
										onChange={e => {
											handleCustomDateRangeChange(key, e.value);
										}}
										selectionMode="range"
										hideOnRangeSelection
										readOnlyInput
										pt={{
											panel: { className: '!w-auto !min-w-0' },
											day: { className: 'p-0' }
										}}
										className="ml-1 w-52 h-[37px] rounded border-solid border-[#CACACA]"
									/>
								</div>
							);
						}
						if (type === 'chipSelection') {
							return (
								<div key={key} className="flex flex-col">
									<label className="min-w-36 pl-1 font-bold">{label}</label>
									<Chips
										key={selectedFilterObj[key]}
										value={selectedFilterObj[key]}
										onChange={e => {
											filter.onOptionsClick(key, e.value);
										}}
										separator=","
										pt={{
											container: {
												className: 'w-full p-1'
											},
											token: {
												className: 'my-1'
											}
										}}
									/>
								</div>
							);
						}
						return <React.Fragment key={key}></React.Fragment>;
					})}
				</div>
				<div className="flex gap-4 justify-center mt-5">
					{showClearButton && (
						<Button
							icon="pi pi-filter-slash"
							tooltip="Clear All Filters"
							pt={{
								icon: { className: 'text-black' }
							}}
							className="text-base cursor-pointer border-none rounded-full bg-[#dfdbdb7a] p-2"
							onClick={() => {
								onClick();
								setSelectedValues({});
							}}
						/>
					)}
					{!!onApply && (
						<Button
							onClick={() => {
								onApply();
							}}
						>
							Apply
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

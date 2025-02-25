import { InputControlField } from '@components/InputField';
import React, { useEffect, useRef, useState } from 'react';
import { format, isValid } from 'date-fns';
import { ErrorMessage, Field } from 'formik';

import { Inplace, InplaceContent, InplaceDisplay } from 'primereact/inplace';
import { DATE_FNS_FORMAT, TimeValue } from '@utilities/date';

const InputControl = ({
	mandatory = false,
	type,
	label,
	tag,
	formObj,
	inplace = false,
	infoLabel = <></>,
	hourInterval,
	minuteInterval,
	// disabled = false,
	...props
}: {
	mandatory?: boolean;
	type: string;
	label?: string;
	tag: string;
	infoLabel?: any;
	formObj: any;
	autoCompleteSuggestionsResponse?: any;
	wrapperClassName?: string;
	minLength?: string;
	multiple?: any;
	disabled?: boolean;
	selectionLimit?: any;
	inplace?: boolean;
	hourInterval?: number;
	minuteInterval?: number;
	displayValue?: any;
	minDate?: Date;
	maxDate?: Date;
	pt?: any;
	[x: string]: any;
}) => {
	const { setFieldValue, touched, errors, values } = formObj;
	const isFormFieldInvalid = (name: string | number) => !!(touched[name] && errors[name]);

	const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<any>([]);
	const selectedDate = isValid(values[tag]) && type === 'date-and-time' ? values[tag] : null;
	const [selectedTime, setSelectedTime] = useState<TimeValue | null>(
		selectedDate ? { hour: selectedDate?.getHours(), minute: selectedDate.getMinutes() } : null
	);

	const inputRef = useRef(null);

	useEffect(() => {
		setAutocompleteSuggestions(props.autoCompleteSuggestionsResponse);
	}, [props.autoCompleteSuggestionsResponse]);

	useEffect(() => {
		if (selectedDate) {
			handleDateTimeChange(selectedDate, selectedTime);
		}
	}, [selectedTime]);

	const handleDateTimeChange = (date: Date | null, time: TimeValue | null) => {
		const updatedDate = date ? new Date(date) : null;
		if (updatedDate && time) {
			updatedDate.setHours(time.hour, time.minute);
		}
		setFieldValue(tag, updatedDate);
	};

	return (
		<Field name={tag}>
			{({ field }: { field: any }) => {
				return (
					<div className={`flex flex-col ${props.wrapperClassName}`}>
						<label htmlFor={tag} className="form-label">
							{label} {mandatory ? <span className="text-red-500">*</span> : <></>}
						</label>
						{inplace ? (
							<Inplace
								closable
								pt={{
									root: {
										className: `w-full ${!!props.disabled ? 'pointer-events-none' : ''}`
									},
									display: {
										className: 'flex p-0 border-2 border-slate-200 hover:bg-transparent'
									},
									content: { className: 'flex grow p-0 [&_.form-group]:grow' },
									closeButton: { root: { className: 'p-0' } }
								}}
								closeIcon="pi pi-check"
							>
								<InplaceDisplay>
									<div className="flex py-1 px-2 relative items-center gap-1 col-span-2 w-full group hover:bg-slate-200 min-h-[2.375rem]">
										<span className={`grow ${props.disabled ? 'text-gray-500' : ''}  min-h-4`}>
											{props.displayValue
												? props.displayValue
												: type === 'calendar'
												? field.value
													? format(field.value, DATE_FNS_FORMAT)
													: ''
												: field.value}
										</span>
										{!props.disabled && (
											<span className="hidden group-hover:block">
												<i className="pi pi-pencil"></i>
											</span>
										)}
									</div>
								</InplaceDisplay>
								<InplaceContent>
									<div className="form-group">
										<InputControlField
											{...{
												type,
												field,
												tag,
												props,
												inplace,
												isFormFieldInvalid,
												setFieldValue,
												inputRef,
												autocompleteSuggestions,
												handleDateTimeChange,
												setSelectedTime,
												selectedDate,
												selectedTime,
												hourInterval,
												minuteInterval
											}}
										/>
									</div>
								</InplaceContent>
							</Inplace>
						) : (
							<div className="form-group">
								<InputControlField
									{...{
										type,
										field,
										tag,
										props,
										inplace,
										isFormFieldInvalid,
										setFieldValue,
										inputRef,
										autocompleteSuggestions,
										handleDateTimeChange,
										setSelectedTime,
										selectedDate,
										selectedTime,
										hourInterval,
										minuteInterval
									}}
								/>
							</div>
						)}
						{infoLabel}
						<ErrorMessage name={tag} className="error-msg" component="p" />
					</div>
				);
			}}
		</Field>
	);
};
export default InputControl;

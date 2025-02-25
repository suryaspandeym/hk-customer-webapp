import React from 'react';
import { sanitizeValue } from '@utilities';

import { AutoComplete } from 'primereact/autocomplete';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import { classNames } from 'primereact/utils';
import { PRIME_REACT_DATE_FORMAT } from '@utilities/date';
import { Chips } from 'primereact/chips';

export const InputControlField = ({
	type,
	field,
	tag,
	props,
	inplace,
	isFormFieldInvalid,
	setFieldValue,
	inputRef,
	autocompleteSuggestions
}: any) => {
	const handleBlur = e => {
		const sanitizedValue = sanitizeValue(e.target.value);
		setFieldValue(tag, sanitizedValue);
		field.onBlur(e);
	};
	if (type === 'number') {
		return (
			<InputNumber
				autoFocus={inplace}
				useGrouping={false}
				className={classNames({
					'w-full': true,
					'p-invalid': isFormFieldInvalid(tag)
				})}
				{...field}
				pt={{
					input: {
						root: { className: 'w-full' }
					}
				}}
				onChange={e => setFieldValue(tag, e.value)}
				{...props}
			/>
		);
	} else if (type === 'email' || type === 'text') {
		return (
			<InputText
				autoFocus={inplace}
				type={type}
				className={classNames({
					'w-full': true,
					'p-invalid': isFormFieldInvalid(tag)
				})}
				{...field}
				{...props}
			/>
		);
	} else if (type === 'textarea') {
		return (
			<InputTextarea
				autoFocus={inplace}
				className={classNames({
					'w-full': true,
					'p-invalid': isFormFieldInvalid(tag)
				})}
				{...field}
				{...props}
				onBlur={handleBlur}
			/>
		);
	} else if (type === 'dropdown') {
		return (
			<Dropdown
				autoFocus={inplace}
				className={classNames({
					'w-full': true,
					'p-invalid': isFormFieldInvalid(tag)
				})}
				{...field}
				{...props}
			/>
		);
	} else if (type === 'multiselect') {
		return (
			<MultiSelect
				autoFocus={inplace}
				className={classNames({
					'w-full': true,
					'p-invalid': isFormFieldInvalid(tag)
				})}
				optionLabel="label"
				emptyFilterMessage="No options available"
				{...field}
				{...props}
			/>
		);
	} else if (type === 'calendar') {
		return (
			<Calendar
				autoFocus={inplace}
				readOnlyInput
				className="w-full"
				dateFormat={PRIME_REACT_DATE_FORMAT}
				pt={{
					panel: { className: '!w-auto !min-w-0' },
					day: { className: 'p-0' }
				}}
				{...field}
				{...props}
				onBlur={() => {}}
			/>
		);
	} else if (type === 'autocomplete') {
		return (
			<AutoComplete
				autoFocus={inplace}
				ref={inputRef}
				forceSelection
				minLength={!!props.minLength ? props.minLength : 3}
				suggestions={autocompleteSuggestions}
				selectionLimit={!!props.multiple ? props.selectionLimit || null : 1}
				showEmptyMessage={true}
				{...field}
				value={!!props.multiple ? field.value : !!field.value ? [field.value] : null}
				onChange={e => {
					setFieldValue(tag, !!props.multiple ? e.value : e.value[0] || null);
				}}
				onUnselect={() => {
					inputRef.current?.focus();
				}}
				pt={{
					...props.pt,
					root: { className: `w-full overflow-auto ${props.pt?.root?.className}` },
					container: {
						className: `w-full flex-nowrap overflow-auto ${props.pt?.container?.className}`
					},
					inputToken: {
						className: `${props.multiple ? 'shrink-0' : ''}  ${props.pt?.inputToken?.className}`
					}
				}}
				// To skip props which need not be passed down as in can be removed
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				{...(({ autoCompleteSuggestionsResponse, ...o }) => o)(props)}
				multiple={true}
			/>
		);
	} else if (type === 'chips') {
		return (
			<Chips
				{...field}
				{...props}
				className={`w-full rounded  border ${isFormFieldInvalid(tag) ? 'p-invalid' : ''}`}
				value={field.value || []}
				onChange={e => setFieldValue(tag, e.value)}
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
		);
	} else {
		return <></>;
	}
};

import React from "react";
import { PRIME_REACT_DATE_FORMAT } from "@utilities/date";
import { ErrorMessage, Field } from "formik";

import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { classNames } from "primereact/utils";

const InputControl = ({ type, label, tag, formObj, infoLabel = <></>, ...props }: any) => {
	const { setFieldValue, touched, errors } = formObj;

	const isFormFieldInvalid = (name: string | number) => !!(touched[name] && errors[name]);

	return (
		<Field name={tag}>
			{({ field }: { field: any }) => (
				<div className="flex flex-col">
					<label htmlFor={tag} className="form-label">
						{label}
					</label>
					<div className="form-group">
						{type === "number" && (
							<InputNumber
								useGrouping={false}
								className={classNames({
									"w-full": true,
									"p-invalid": isFormFieldInvalid(tag)
								})}
								{...field}
								{...props}
							/>
						)}
						{(type === "email" || type === "text") && (
							<InputText
								type={type}
								className={classNames({
									"w-full": true,
									"p-invalid": isFormFieldInvalid(tag)
								})}
								{...field}
								{...props}
							/>
						)}
						{type === "textarea" && (
							<InputTextarea
								className={classNames({
									"w-full": true,
									"p-invalid": isFormFieldInvalid(tag)
								})}
								{...field}
								{...props}
							/>
						)}
						{type === "dropdown" && (
							<Dropdown
								className={classNames({
									"w-full": true,
									"p-invalid": isFormFieldInvalid(tag)
								})}
								{...field}
								{...props}
							/>
						)}
						{type === "multiselect" && (
							<MultiSelect
								className={classNames({
									"w-full": true,
									"p-invalid": isFormFieldInvalid(tag)
								})}
								optionLabel="label"
								emptyFilterMessage="No options available"
								{...field}
								{...props}
							/>
						)}
						{type === "calendar" && (
							<Calendar
								readOnlyInput
								className="w-full"
								dateFormat={PRIME_REACT_DATE_FORMAT}
								pt={{
									panel: { className: "!w-auto !min-w-0" },
									day: { className: "p-0" }
								}}
								{...field}
								{...props}
							/>
						)}
					</div>
					{infoLabel}
					<ErrorMessage name={tag} className="error-msg" component="p" />
				</div>
			)}
		</Field>
	);
};
export default InputControl;

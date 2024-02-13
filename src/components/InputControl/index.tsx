import React from "react";
import { ErrorMessage } from "formik";

import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";

const InputControl = ({ type, label, tag, formObj, value, ...props }: any) => {
	const { setFieldValue, touched, errors, handleBlur } = formObj;

	const isFormFieldInvalid = (name: string | number) => !!(touched[name] && errors[name]);

	return (
		<div className="flex flex-col">
			<label htmlFor={tag} className="form-label">
				{label}
			</label>
			<div className="form-group">
				{type === "number" && (
					<InputNumber
						id={tag}
						name={tag}
						value={value}
						useGrouping={false}
						onBlur={handleBlur}
						onChange={(e: any) => {
							setFieldValue(tag, e.value ?? "");
						}}
						className={classNames({
							"w-full": true,
							"p-invalid": isFormFieldInvalid(tag)
						})}
						{...props}
					/>
				)}
				{(type === "email" || type === "text") && (
					<InputText
						type={type}
						id={tag}
						name={tag}
						value={value}
						onChange={(e: any) => {
							setFieldValue(tag, e.target.value);
						}}
						className={classNames({
							"w-full": true,
							"p-invalid": isFormFieldInvalid(tag)
						})}
						{...props}
					/>
				)}
				{type === "textarea" && (
					<InputTextarea
						type={type}
						id={tag}
						name={tag}
						value={value}
						onChange={(e: any) => {
							setFieldValue(tag, e.target.value);
						}}
						className={classNames({
							"w-full": true,
							"p-invalid": isFormFieldInvalid(tag)
						})}
						{...props}
					/>
				)}
			</div>
			<ErrorMessage name={tag} className="error-msg" component="p" />
		</div>
	);
};
export default InputControl;

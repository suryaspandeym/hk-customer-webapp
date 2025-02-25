import React from 'react';
import { DocumentUploadControl } from '@components/DocumentUploadControl';
import InputControl from '@components/InputControl';
import { UPLOAD_TYPE_KEYS, UPLOAD_TYPES } from '@utilities/constants';
import { Form, FormikProvider } from 'formik';

import { Button } from 'primereact/button';

export const UploadDocumentsForm = ({
	documentForm,
	renderFileUploadControl,
	setFieldValue,
	onFileUploadSuccess,
	setFileUploadSuccess,
	setAddMoreFiles,
	isSubmitting,
	categoryOptions,
	subCategoryOptions,
	uploadTypeCondition,
	handleUploadTypeChange,
	showUploadControl,
	multiple = true
}: any) => {
	return (
		<FormikProvider value={documentForm}>
			<Form className="flex flex-col gap-4 mt-4">
				<h2 className="font-bold">Add More Documents</h2>
				<InputControl
					type="dropdown"
					label="Document Category"
					formObj={documentForm}
					tag="category"
					placeholder="Select Document category"
					options={categoryOptions}
					optionLabel="label"
					optionValue="key"
					onChange={e => {
						setFieldValue('category', e.target.value);
						setFieldValue('uploadType', '');
						setFieldValue('subCategory', '');
					}}
				/>
				<InputControl
					type="dropdown"
					label="Document Sub Category"
					formObj={documentForm}
					tag="subCategory"
					placeholder="Select Document Subcategory"
					options={subCategoryOptions}
					optionLabel="label"
					optionValue="key"
					disabled={!documentForm.values.category}
					onChange={e => {
						setFieldValue('subCategory', e.target.value);

						setFieldValue('uploadType', '');
					}}
				/>
				{uploadTypeCondition && (
					<InputControl
						type="dropdown"
						label="Upload Type"
						formObj={documentForm}
						tag="uploadType"
						options={Object.values(UPLOAD_TYPES).filter(type => type.key !== UPLOAD_TYPE_KEYS.DOCUMENT)}
						optionLabel="label"
						optionValue="key"
						onChange={handleUploadTypeChange}
					/>
				)}
				<DocumentUploadControl
					{...renderFileUploadControl()}
					multiple={multiple}
					setFieldValue={setFieldValue}
					onFileUploadSuccess={onFileUploadSuccess}
					setFileUploadSuccess={setFileUploadSuccess}
					formObj={documentForm}
					showUploadControl={showUploadControl}
				/>
				<div className="footer p-0">
					<Button
						type="reset"
						link
						label="Reset"
						disabled={isSubmitting}
						onClick={() => setAddMoreFiles(false)}
					/>
					<Button
						type="submit"
						label="Upload Document"
						disabled={
							!documentForm?.values?.files?.length &&
							documentForm.values.uploadType !== UPLOAD_TYPE_KEYS.YOUTUBE_LINK
						}
						loading={isSubmitting}
					/>
				</div>
			</Form>
		</FormikProvider>
	);
};

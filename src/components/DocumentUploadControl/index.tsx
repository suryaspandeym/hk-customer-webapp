import React from 'react';
import { FileUploadControl } from '@components/FileUploadControl';
import InputControl from '@components/InputControl';
import { DOCUMENT_UPLOAD_MAX_SIZE, FILE_UPLOAD_MESSAGE } from '@utilities/constants';

export const DocumentUploadControl = ({
	showUploadControl,
	isVideoUpload,
	accept,
	setFieldValue,
	onFileUploadSuccess,
	setFileUploadSuccess,
	showLinkControl,
	formObj,
	onCoverImageSelect,
	coverImageRequired,
	multiple
}: any) => {
	return (
		<>
			{showUploadControl && (
				<FileUploadControl
					isVideoUpload={isVideoUpload}
					multiple={multiple}
					accept={accept}
					maxFileSize={DOCUMENT_UPLOAD_MAX_SIZE}
					emptyTemplate={<p className="m-0">{FILE_UPLOAD_MESSAGE}</p>}
					onSelect={(e, files) => {
						setFieldValue('document.files', files);
					}}
					onRemove={(e, files) => {
						setFieldValue('document.files', files);
					}}
					onFileUploadSuccess={onFileUploadSuccess}
					setFileUploadSuccess={setFileUploadSuccess}
					onCoverImageSelect={onCoverImageSelect}
					coverImageRequired={coverImageRequired}
					pt={{
						root: {
							className: ''
						},
						buttonbar: {
							className: '[&>button]:hidden',
							root: {
								className: ''
							}
						},
						chooseButton: {
							className: ''
						},
						details: {
							className: '[&>.p-badge]:hidden'
						}
					}}
				/>
			)}

			{showLinkControl && (
				<InputControl
					type="text"
					label="YouTube Link"
					formObj={formObj}
					tag="link"
					placeholder="Paste YouTube link here"
				/>
			)}
		</>
	);
};

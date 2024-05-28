import React, { useEffect, useRef } from "react";
import { toast } from "@utilities/toasts";

import { FileUpload } from "primereact/fileupload";

export const FileUploadControl = ({
	name,
	accept,
	maxFileSize,
	multiple,
	onSelect,
	onRemove,
	onError,
	onFileUploadSuccess,
	setFileUploadSuccess,
	uploadHandler,
	...props
}: any) => {
	const fileRef = useRef(null);

	useEffect(() => {
		if (onFileUploadSuccess) {
			fileRef?.current?.clear();
			setFileUploadSuccess(false);
		}
	}, [onFileUploadSuccess]);

	const validateFileUpload = (e) => {
		const fileTypeError = e.files.some((file) => {
			return !file.type.startsWith("image/") && file.type !== "application/pdf";
		});

		const invalidFileName = e.files.some((file) => {
			return file.name.length > 50;
		});
		if (fileTypeError) {
			toast("ERROR", "Please select a PDF or image file");

			fileRef?.current?.clear();
			return false;
		} else if (invalidFileName) {
			toast("ERROR", "File name cannot be more than 50 characters");

			fileRef?.current?.clear();
			return false;
		}
		return true;
	};

	return (
		<FileUpload
			ref={fileRef}
			name={name}
			multiple={multiple}
			accept={accept}
			maxFileSize={maxFileSize}
			// emptyTemplate={<p className="m-0">DROP FILES HERE</p>}
			onSelect={(e) => {
				if (!validateFileUpload(e)) {
					return;
				}
				const files = [...e.files];
				onSelect(e, files);
			}}
			onRemove={(e) => {
				setTimeout(() => {
					const currFile = fileRef?.current?.getFiles();
					onRemove(e, currFile);
				});
			}}
			onError={onError}
			uploadHandler={uploadHandler}
			{...props}
		/>
	);
};

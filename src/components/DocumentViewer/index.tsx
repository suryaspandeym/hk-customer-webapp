import React from 'react';
import PreviewURL from '@components/PreviewURL';

import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { RadioButton } from 'primereact/radiobutton';

const DocumentViewer = ({ item, urlObj, deleteDocument, handleCoverImageChange, showFileName }: any) => {
	const confirmDeleteDocument = (event: any, documentUrlId: any) => {
		confirmPopup({
			target: event.currentTarget,
			message: 'Do you want to delete this document?',
			icon: 'pi pi-info-circle',
			accept: () => deleteDocument(documentUrlId)
		});
	};
	return (
		<div className="flex">
			<a href={item.documentUrl} target="_blank" className="relative" rel="noreferrer">
				<div className={'h-32 w-32 flex justify-center items-center'}>
					<PreviewURL
						urlObj={
							urlObj || {
								fileName: item.fileName,
								documentUrl: item.thumbnailDocumentUrl || item.documentUrl,
								docContentType: item.docContentType
							}
						}
						disableClick
						showFileName={showFileName}
					/>
				</div>
			</a>

			{item.coverImage !== undefined && (
				<span>
					<RadioButton
						inputId={`cb-${item.documentUrlId}`}
						checked={item.coverImage}
						onChange={() => handleCoverImageChange(item.documentUrlId)}
					/>
				</span>
			)}
			<span className="min-w-4 ml-2">
				<ConfirmPopup />
				<i
					className="pi pi-trash text-red-600 hover:cursor-pointer"
					onClick={e => confirmDeleteDocument(e, item.documentUrlId)}
					title="Delete document"
				/>
			</span>
		</div>
	);
};

export default DocumentViewer;

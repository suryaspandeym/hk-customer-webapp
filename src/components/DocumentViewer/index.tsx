import React from 'react';
import PreviewURL from '@components/PreviewURL';

import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';

const DocumentViewer = ({ item, urlObj, deleteDocument }: any) => {
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
				<div className={'h-32 w-32'}>
					<PreviewURL
						urlObj={
							urlObj || {
								fileName: item.fileName,
								documentUrl: item.thumbnailDocumentUrl || item.documentUrl,
								docContentType: item.docContentType
							}
						}
						disableClick
					/>
				</div>
			</a>
			<span className="min-w-4">
				<ConfirmPopup />
				<i
					className="pi pi-trash hover:cursor-pointer"
					onClick={e => confirmDeleteDocument(e, item.documentUrlId)}
					title="Delete document"
				/>
			</span>
		</div>
	);
};

export default DocumentViewer;

import Compressor from "compressorjs";
import { fileUploadWithoutToken, UPLOAD_DOC_TYPES } from "@utilities";
import { type AxiosResponse } from "axios";

export const uploadFn = async (uploadFileFn, urls: any[], attachments) => {
    for (const [idx, { documentUrl, thumbnailUrl, fileName }] of urls.entries()) {
        const uploadF = attachments[idx];
        // ;
        // TODO: File Format transformation
        // const mediaFile: any = await new Compressor(uploadF, {});
        await uploadFileFn(documentUrl, uploadF, fileName);
        if (uploadF.type !== UPLOAD_DOC_TYPES.PDF && !!thumbnailUrl?.length) {
            // TODO: Add support for pdf, video, enhance thumbnail generation
            const thumbnailFile: any = await new Compressor(uploadF, { quality: 0.2 });
            await uploadFileFn(thumbnailUrl, thumbnailFile.file, fileName);
        }
    }
};

export const uploadDocumentArr = (formData: any, documentsResponseList) => {
    const uploadedDocuments: string[] = [];
    return {
        arrPromises: formData.documents.map(async (doc: any) => {
            const docRes = documentsResponseList.find((res: any) => res.category === doc.category && res.subCategory === doc.subCategory);
            const docId = docRes.documentId;
            const urlObjs = docRes.attachments;
            uploadedDocuments.push(docId);
            await uploadFn(uploadFile, urlObjs, doc.fileNames);
        }),
        uploadedDocuments,
    };
};

export const uploadPropertyConfigurationDocumentArr = (formData: any, propertyUnits) => {
    const uploadedPropertyDocuments: string[] = [];
    return {
        arrPropertyPromises: formData.propertyUnits.map((unit: any, unitIdx: number) => {
            if (unit?.floorPlan?.length) {
                const docRes = propertyUnits[unitIdx];
                const docId = docRes.documentId;
                const urlObjs = docRes.attachments;
                uploadedPropertyDocuments.push(docId);
                urlObjs.forEach(async (urlObj: any, idx: number) => {
                    const file = unit.floorPlan[idx];
                    await fileUploadWithoutToken(urlObj.documentUrl, file, {
                        headers: {
                            file: file.name,
                        },
                    });
                });
            }
        }),
        uploadedPropertyDocuments,
    };
};

// Upload File
export const uploadFile = async (url: string, file: any, fileName: string): Promise<AxiosResponse> =>
    await fileUploadWithoutToken(url, file, {
        headers: {
            file: fileName,
        },
    });

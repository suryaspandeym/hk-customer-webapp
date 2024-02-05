import React, { useEffect, useState } from "react";
import { VscFilePdf } from "react-icons/vsc";
import YoutubeEmbed from "@components/YoutubeEmbed";
import { fetchHeadObjFromURL } from "@utilities";
import { fileNameFromURL, isBlobFile, isDocFile, isImgFile, isYoutubeLink } from "@utilities/doc";

interface PreviewProps {
	urlObj: any;
	hideName?: boolean;
	disableClick?: boolean;
	containerClasses?: string;
	elementClasses?: string;
	showFileName?: boolean;
}

export const PreviewURL = ({ urlObj, hideName, disableClick = false, showFileName = true, ...props }: PreviewProps) => {
	const [headObj, setHeadObj] = useState<any>(null);
	const openInNewTab = () => {
		if (!disableClick) {
			window.open(urlObj.documentUrl, "_blank");
		}
	};

	const removeImg = (e: any) => {
		e.target.remove();
	};

	const fetchHeadObj = async () => {
		const res: any = await fetchHeadObjFromURL(urlObj.documentUrl);
		setHeadObj(res);
	};

	useEffect(() => {
		fetchHeadObj();
	}, []);

	const fileName = !hideName && (
		<span>{urlObj?.fileName || (!!headObj && headObj.headers["x-amz-meta-filename"]) || fileNameFromURL(urlObj.documentUrl)}</span>
	);

	if (isImgFile(urlObj)) {
		return (
			<div className={["flex w-auto items-center gap-2 cursor-pointer", props.containerClasses].join(" ")} onClick={openInNewTab}>
				<img
					src={urlObj.documentUrl}
					alt="unavailable"
					className={["relative object-fill h-28 w-28 rounded-sm cursor-pointer", props.elementClasses].join(" ")}
					onError={removeImg}
				/>
				{showFileName && fileName}
			</div>
		);
	} else if (isDocFile(urlObj)) {
		// Fetch Header Obj
		return (
			<div className="flex w-auto items-center gap-2 cursor-pointer" onClick={openInNewTab}>
				<VscFilePdf size="40" />
				{fileName}
			</div>
		);
	} else if (isBlobFile(urlObj)) {
		return (
			<div className="flex w-auto items-center gap-2 cursor-pointer" onClick={openInNewTab}>
				<img
					src={urlObj.documentUrl}
					alt="unavailable"
					className="relative object-fill h-28 w-28 rounded-sm mr-4 cursor-pointer"
					onError={removeImg}
				/>
				{fileName}
			</div>
		);
	} else if (isYoutubeLink(urlObj.documentUrl)) {
		return <YoutubeEmbed url={urlObj.documentUrl} containerClasses={props.containerClasses} elementClasses={props.elementClasses} />;
	} else {
		// return (
		//     <div className="flex w-auto items-center gap-2 cursor-pointer" onClick={openInNewTab}>
		//         -Missing-
		//     </div>
		// );
		return <></>;
	}
};
export default PreviewURL;

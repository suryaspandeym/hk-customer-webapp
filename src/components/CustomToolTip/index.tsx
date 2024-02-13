import React from "react";

import { Tooltip } from "primereact/tooltip";

const CustomTooltip = ({ content, iconClass, position = "top" }: any) => {
	return (
		<>
			<Tooltip target=".custom-target-icon" at={`right+5 top`} position={position} my="left center-2" />
			<i className={`custom-target-icon pi ${iconClass}`} data-pr-tooltip={content} style={{ cursor: "pointer" }}></i>
		</>
	);
};

export default CustomTooltip;

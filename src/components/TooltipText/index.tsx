import React from "react";

import { Tooltip } from "primereact/tooltip";

export const TooltipText = ({ tooltipText, charCount = 20, classList }: any) => {
	return (
		<>
			{tooltipText?.length > charCount ? (
				<>
					<Tooltip target=".custom-target-icon" />
					<div
						style={{ maxWidth: `${charCount}ch` }}
						className={`overflow-hidden ${classList} overflow-ellipsis whitespace-nowrap custom-target-icon cursor-pointer1`}
						data-pr-tooltip={tooltipText}
						data-pr-position="top"
					>
						{tooltipText}
					</div>
				</>
			) : (
				<div className={`overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[${charCount * 10}px] custom-target-icon `}>
					{tooltipText}
				</div>
			)}
		</>
	);
};

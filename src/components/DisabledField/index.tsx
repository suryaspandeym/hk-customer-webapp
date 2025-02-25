import React from 'react';

const DisabledField = ({ label, value }: { label: string; value: string }) => {
	return (
		<div className="flex gap-2 text-basetext-base">
			<span>{label} : </span>
			<span className="font-bold">{value}</span>
		</div>
	);
};

export default DisabledField;

import React from "react";
import InputControl from "@components/InputControl";

const AddressDetails = ({ formObj, tag, removeCoordinate = false }: { formObj: any; tag: string; removeCoordinate?: boolean }) => {
	return (
		<div className="flex flex-col gap-4">
			<div className="gap-4 grid grid-cols-1">
				<InputControl inplace type="text" label="Address Line 1" formObj={formObj} tag={`${tag}.addressLine1`} />
				<InputControl inplace type="text" label="Address Line 2" formObj={formObj} tag={`${tag}.addressLine2`} />
			</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
				<InputControl inplace type="text" label="Landmark" formObj={formObj} tag={`${tag}.landmark`} />
				<InputControl inplace type="text" label="City" formObj={formObj} tag={`${tag}.city`} />
				<InputControl inplace type="text" label="District" formObj={formObj} tag={`${tag}.district`} />
				<InputControl inplace type="text" label="State" formObj={formObj} tag={`${tag}.state`} />
				<InputControl inplace type="text" label="Country" formObj={formObj} tag={`${tag}.country`} />
				<InputControl inplace type="text" label="Pincode" formObj={formObj} tag={`${tag}.pincode`} keyfilter="pint" />
				{removeCoordinate ? null : (
					<>
						<InputControl inplace type="text" label="Latitude" formObj={formObj} tag={`${tag}.coordinate.latitude`} />
						<InputControl inplace type="text" label="Longitude" formObj={formObj} tag={`${tag}.coordinate.longitude`} />
					</>
				)}
			</div>
		</div>
	);
};

export default AddressDetails;

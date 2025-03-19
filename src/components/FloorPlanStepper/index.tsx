import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { ErrorMessage, Form, FormikProvider, useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { ProjectActionType } from '@store/branches/project/enums';
import { toast } from '@utilities';

export const FloorPlanStepper = ({ onNext }: any) => {
	const dispatch = useDispatch();

	const initialValues = {
		projectName: '',
		budget: ''
	};
	const uploadFloorPlanForm = useFormik({
		initialValues,
		// validationSchema:uploadFloorPlanFormSchema,
		onSubmit: values => {
			dispatch({
				type: ProjectActionType.ADD_PROJECT_DETAILS,
				payload: {
					formData: values,
					errorCB: (message: string) => {
						toast('ERROR', message);
					},
					successCB: () => {
						onNext;
					}
				}
			});
		}
	});

	const { values, setFieldValue } = uploadFloorPlanForm;
	const isFloorPlan = false;

	return (
		<div className="p-4 h-full flex flex-col">
			<div className="flex-grow justify-center">
				{!isFloorPlan ? (
					<>
						<div className="w-[493px] h-[420px] bg-[#F7F9FC] flex flex-col  justify-center items-center px-60 py-44">
							<Button
								icon="pi pi-file-pdf"
								className="bg-transparent text-black border-none hover:none"
							/>
							<h1 className="font-bold text-sm">Upload your floor plan</h1>
							<div className="text-[10px] text-[#23232399]">
								Image should be in png, jpg, jpeg or pdf format and should not exceed more than 50 mb.
							</div>
						</div>
						<div className="absolute bottom-2.5 ">
							<Button
								type="submit"
								label="Save and Continue"
								icon="pi pi-arrow-right"
								iconPos="right"
								onClick={onNext}
								className="bg-transparent text-black border rounded-xl w-full"
							/>
						</div>
					</>
				) : (
					<FormikProvider value={uploadFloorPlanForm}>
						<Form className="h-full flex flex-col">
							<></>
						</Form>
					</FormikProvider>
				)}
			</div>
		</div>
	);
};

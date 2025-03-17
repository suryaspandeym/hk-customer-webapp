import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { ErrorMessage, Form, FormikProvider, useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Slider } from 'primereact/slider';
import { calculatePosition, formatToLakhs } from '@containers/NewProject/constants';
import { Checkbox } from 'primereact/checkbox';
import { useDispatch } from 'react-redux';
import { ProjectActionType } from '@store/branches/project/enums';
import { toast } from '@utilities';

export const ProjectDetailsStepper = ({ onNext }: any) => {
	const dispatch = useDispatch();

	const initialValues = {
		projectName: '',
		budget: ''
	};
	const projectDetailsForm = useFormik({
		initialValues,
		// validationSchema:addProjectDetailsSchema,
		onSubmit: values => {
			// debugger;
			dispatch({
				type: ProjectActionType.ADD_PROJECT_DETAILS,
				payload: {
					formData: values,
					errorCB: (message: string) => {
						toast('ERROR', message);
					},
					successCB: () => {
						// debugger;
						onNext();
					}
				}
			});
		}
	});

	const [sliderValue, setSliderValue] = useState(500000);
	const [hasBudget, setHasBudget] = useState(true);

	const { values, setFieldValue } = projectDetailsForm;

	return (
		<div className="p-4 h-full flex flex-col">
			<div className="flex-grow">
				<FormikProvider value={projectDetailsForm}>
					<Form className="h-full flex flex-col">
						<div>
							<label className="text-base" htmlFor="projectName">
								Project Name*
								<InputText
									value={values.projectName}
									onChange={e => projectDetailsForm.setFieldValue('projectName', e.target.value)}
									id="projectName"
									className="mt-2 w-full appearance-none rounded-md border px-3 py-2 leading-tight text-gray-700 focus:outline-none hover:border-black focus:ring focus:ring-black"
								/>
								<ErrorMessage className="error-msg" component="div" name="project.projectName" />
							</label>
						</div>

						<div className="mt-6">
							<div className="flex justify-between text-sm text-gray-600">
								<div className="flex flex-col items-start">
									<span>Min. Budget</span>
									<div className="mt-1 border border-gray-300 rounded-md px-4 py-3">
										<span>{formatToLakhs(500000)}</span>
									</div>
								</div>
								<div className="flex flex-col items-end">
									<span>Max. Budget</span>
									<div className="mt-1 border border-gray-300 rounded-md px-4 py-3">
										<span>{formatToLakhs(3000000)}</span>
									</div>
								</div>
							</div>

							<div className="flex flex-col gap-4 relative mb-4 mt-4">
								<div
									className={`transition-opacity duration-500 relative w-full ${
										hasBudget ? 'opacity-100' : 'opacity-50 pointer-events-none'
									}`}
								>
									{sliderValue !== 500000 && sliderValue !== 3000000 && (
										<div
											className="absolute text-center text-gray-600"
											style={{
												bottom: '1.25rem',
												left: `calc(${calculatePosition(sliderValue)}% - 10px)`,
												transition: 'left 0.2s ease'
											}}
										>
											{formatToLakhs(sliderValue)}
										</div>
									)}
									<Slider
										value={sliderValue}
										onChange={e => {
											const newValue = e.value;
											setSliderValue(newValue);
											if (hasBudget) {
												setFieldValue('budget', newValue);
											}
										}}
										className="w-full"
										min={500000}
										max={3000000}
										step={100000}
										disabled={!hasBudget}
									/>
								</div>
							</div>
						</div>

						<div className="flex justify-between items-center gap-2 mt-6">
							<div className="flex gap-2 items-center">
								<Checkbox
									onChange={() => {
										const newHasBudget = !hasBudget;
										setHasBudget(newHasBudget);
										setFieldValue('budget', newHasBudget ? sliderValue : null);
									}}
									checked={!hasBudget}
								/>
								<span className="text-sm text-gray-600">Open to any budget</span>
							</div>
						</div>

						<div className="absolute bottom-2.5 ">
							<Button
								type="submit"
								label="Save and Continue"
								icon="pi pi-arrow-right"
								iconPos="right"
								// onClick={onNext}
								className="bg-transparent text-black border rounded-xl w-full"
							/>
						</div>
					</Form>
				</FormikProvider>
			</div>
		</div>
	);
};

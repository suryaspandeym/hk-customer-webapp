import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { ProjectDetailsStepper } from '@components/ProjectDetailsStepper';
import { FloorPlanStepper } from '@components/FloorPlanStepper';
import { QuotationBreakupStepper } from '@containers/UpdateQuotationBreakup';

export const NewProject = () => {
	const [activeStep, setActiveStep] = useState(0);

	const steps = [
		{
			label: 'Project Details',
			content: <ProjectDetailsStepper onNext={() => setActiveStep(1)} />
		},
		{
			label: 'Floor Plan',
			content: <FloorPlanStepper onNext={() => setActiveStep(2)} />
		},
		{
			label: 'Quotation Breakup',
			content: <QuotationBreakupStepper onNext={() => setActiveStep(3)} />
		},
		{
			label: 'Checkout',
			content: <div className="text-center p-6">Checkout</div>
		}
	];

	return (
		<div className="p-6 h-full">
			<div className="flex items-center space-x-2 text-2xl font-bold mb-6">
				<i className="pi pi-arrow-left text-xl" />
				<span>New Project</span>
			</div>

			<div className="flex justify-between">
				{steps.map((step, index) => (
					<div key={index} className="w-1/4 text-center">
						<span
							className={`block text-sm uppercase ${
								index === activeStep ? 'text-black font-bold' : 'text-gray-400'
							}`}
						>
							{step.label}
						</span>

						<div className="w-full mt-2">
							<div
								className={`h-1 ${index <= activeStep ? 'bg-black' : 'bg-gray-200'} rounded`}
								style={{ width: '85%' }}
							/>
						</div>
					</div>
				))}
			</div>

			<div>
				{activeStep === 0 && <ProjectDetailsStepper onNext={() => setActiveStep(1)} />}
				{activeStep === 1 && <FloorPlanStepper onNext={() => setActiveStep(2)} />}
				{activeStep === 2 && <QuotationBreakupStepper onNext={() => setActiveStep(3)} />}
				{activeStep === 3 && <div>Checkout Content</div>}
			</div>

			<div className="flex justify-between mt-6">
				{activeStep !== 0 && (
					<Button
						label="Back"
						icon="pi pi-arrow-left"
						className="p-button-secondary"
						onClick={() => setActiveStep(activeStep - 1)}
					/>
				)}
			</div>
		</div>
	);
};

export default NewProject;

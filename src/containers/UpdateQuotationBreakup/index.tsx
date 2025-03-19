import ProductCard from '@components/ProductCard';
import { UpdateQuotationBreakupSelection } from '@components/QuotationBreakupSelection';
import { ProjectActionType } from '@store/branches/project/enums';
import { useAppSelector } from '@store/selectors';
import { formatCurrencyINR, toast } from '@utilities';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { ScrollPanel } from 'primereact/scrollpanel';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
export const QuotationBreakupStepper = ({ onNext }: any) => {
	const dispatch = useDispatch();

	const [selectedType, setSelectedType] = useState<string | null>(null);

	const [quotationBreakupModal, setQuotationBreakupModal] = useState(false);

	const { quotationData, preDesignQuotation, defaultQuotations } = useAppSelector(state => state.project);
	const fetchQuotationDetails = () => {
		/// same as getPredesignQuotatopn // custom
		dispatch({
			type: ProjectActionType.FETCH_QUOTATION_DETAILS,
			payload: {
				predictionId: 1,
				errorCB: (message: string) => {
					toast('ERROR', message);
				}
			}
		});
	};

	const selectedAreas = {
		areas: [
			{
				areaName: 'Living Room',
				primary: true,
				products: [
					{
						productName: 'Sofa Set',
						measurement: {
							width: 2000,
							depth: 800,
							height: 900,
							area: 1.6
						},
						quantity: 1,
						type: 'LITE'
					},
					{
						productName: 'Coffee Table',
						measurement: {
							width: 1200,
							depth: 600,
							height: 400,
							area: 0.72
						},
						quantity: 1,
						type: 'LITE'
					}
				]
			},
			{
				areaName: 'Bedroom',
				primary: false,
				products: [
					{
						productName: 'Bed Frame',
						measurement: {
							width: 1800,
							depth: 2000,
							height: 400,
							area: 3.6
						},
						quantity: 1,
						type: 'LITE'
					},
					{
						productName: 'Wardrobe',
						measurement: {
							width: 2400,
							depth: 600,
							height: 2200,
							area: 5.28
						},
						quantity: 1,
						type: 'LITE'
					}
				]
			}
		],
		budgetType: 'LITE',
		budget: 10000
	};

	const getPreDesignQuotation = () => {
		dispatch({
			type: ProjectActionType.GET_PRE_DESIGN_QUOTATION,
			payload: {
				selectedAreas,
				budget: 500000, /// figure out from where to get budget
				// successCB: () => {
				// 	setAreaActiveIndex(2);
				// },
				errorCB: message => toast('ERROR', message)
			}
		});
	};

	const getDefaultQuotation = () => {
		dispatch({
			type: ProjectActionType.GET_DEFAULT_QUOTATION,
			payload: {
				selectedAreas,
				budget: 500000,
				errorCB: message => toast('ERROR', message)
			}
		});
	};

	useEffect(() => {
		fetchQuotationDetails(); /// same as getPreDesignQuotation
		getPreDesignQuotation();
		getDefaultQuotation();
	}, []);

	const allTypes = ['LITE', 'ELEGANT', 'ELITE'];

	const areaTotals = quotationData?.quotations?.reduce((acc, area) => {
		acc[area.areaEnum] = area?.products.reduce((sum, product) => sum + product.price, 0);
		return acc;
	}, {} as Record<string, number>);

	const grandTotal = quotationData?.quotations?.reduce((total, area) => {
		return total + area.products?.reduce((subtotal, product) => subtotal + product.price, 0);
	}, 0);

	const getTypesInArea = area => {
		return Array.from(new Set(area?.products.map(product => product.type)));
	};

	return (
		<div className="min-h-screen bg-white">
			<div className="text-right">
				<Button
					label="View Quotation Breakup"
					icon="pi pi-plus-circle"
					iconPos="right"
					className="bg-transparent border-none font-semibold text-[14px] text-[#232323] gap-2"
					onClick={() => {
						setQuotationBreakupModal(true);
					}}
				/>
			</div>
			<ScrollPanel style={{ width: '100%', height: 'calc(100vh - 180px)' }}>
				<div className="container mx-auto px-6 py-8 space-y-12">
					{quotationData?.quotations?.map(area => {
						const typesInThisArea = getTypesInArea(area);

						return (
							<div key={area.areaEnum} className="space-y-6">
								<div className="flex justify-between items-center">
									<div>
										<h2 className="text-2xl font-bold">{area.areaName}</h2>
										<p className="text-sm text-gray-500">Primary Area</p>
									</div>
								</div>

								<div className="flex gap-3">
									{allTypes.map(type => (
										<Button
											key={type}
											label={type}
											className={`px-4 py-2 rounded-full m-0 border ${
												typesInThisArea.includes(type)
													? type === 'LITE' || type === 'ELITE' || type === 'ELEGANT'
														? 'bg-black text-white'
														: 'bg-white text-black border-gray-300'
													: 'bg-white text-black border-gray-300'
											}`}
											onClick={() => setSelectedType(selectedType === type ? null : type)}
										/>
									))}
								</div>
								<div className="relative">
									<ScrollPanel style={{ width: '100%', height: '175px' }}>
										<div className="flex gap-6">
											{area.products.map((product, index) => (
												<div
													key={product.productId}
													className={
														index === area.products.length - 1 && area.products.length > 3
															? 'w-[83px]'
															: ''
													}
												>
													<ProductCard product={product} />
												</div>
											))}
										</div>
									</ScrollPanel>
								</div>
							</div>
						);
					})}
				</div>
			</ScrollPanel>
			<div className="sticky-bottom border-t h-[208px]">
				<div className="container mx-auto px-6 py-6">
					<div className="flex justify-between space-y-4 ">
						<Button
							label="Go to Checkout"
							icon="pi pi-arrow-right"
							iconPos="right"
							className="p-button-outlined border-black text-black hover:bg-gray-100 h-[48px] mt-28 md:w-60"
							style={{ borderRadius: '12px' }}
							onClick={onNext}
						/>
						<Card
							className="flex flex-col md:flex-row justify-between items-start w-[493px] h-48 md:items-center"
							style={{ borderRadius: '24px' }}
						>
							<div>
								<div>
									<div className="flex justify-between items-center">
										<h3 className="text-2xl font-medium">Grand Total</h3>
										<div className=" text-[#232323] text-2xl font-bold plus-jakarta-sans-font md:mt-0">
											{formatCurrencyINR(grandTotal)}
										</div>
									</div>
									<div className="text-[12px] text-[#23232399]">
										<p className=" mt-1">Note:</p>
										<p className="max-w-md">
											The price mentioned above is your estimated quotation. For accurate
											quotation, please connect with us for the site visit.
										</p>
									</div>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</div>
			{quotationBreakupModal && (
				<Dialog
					visible={quotationBreakupModal}
					onHide={() => setQuotationBreakupModal(false)}
					header="Quotation Breakup"
					style={{ width: '130vw', maxWidth: '1000px' }}
				>
					<UpdateQuotationBreakupSelection
						preDesignQuotationData={quotationData}
						defaultQuotationData={defaultQuotations}
						onClose={() => setQuotationBreakupModal(false)}
					/>
				</Dialog>
			)}
		</div>
	);
};

import { formatCurrencyINR } from '@utilities';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { ScrollPanel } from 'primereact/scrollpanel';
import { TabPanel, TabView } from 'primereact/tabview';
import { Tag } from 'primereact/tag';
import React, { useEffect, useState } from 'react';
export const UpdateQuotationBreakupSelection = ({ preDesignQuotationData, defaultQuotationData, onClose }: any) => {
	const [activeAreaIndex, setActiveAreaIndex] = useState<number>(0);
	const [displayImageDialog, setDisplayImageDialog] = useState<boolean>(false);
	const [selectedImage, setSelectedImage] = useState<string>('');
	const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
	const [quotationData, setQuotationData] = useState(preDesignQuotationData);
	const [currentArea, setCurrentArea] = useState(null);
	const [isTabManuallySelected, setIsTabManuallySelected] = useState<boolean>(false);

	useEffect(() => {
		if (
			preDesignQuotationData?.quotations?.length > 0 &&
			activeAreaIndex < preDesignQuotationData?.quotations.length
		) {
			const area = preDesignQuotationData?.quotations[activeAreaIndex];
			setCurrentArea(area);

			if (!isTabManuallySelected) {
				if (area.type === 'LITE') setActiveTabIndex(0);
				else if (area.type === 'ELEGANT') setActiveTabIndex(1);
				else if (area.type === 'ELITE') setActiveTabIndex(2);
			}
		}
	}, [activeAreaIndex, preDesignQuotationData, isTabManuallySelected]);

	useEffect(() => {
		let newData;
		let areaEnum = '';

		if (currentArea) {
			areaEnum = currentArea.areaEnum;
		}

		if (activeTabIndex === 0) {
			newData = defaultQuotationData.liteQuotation;
		} else if (activeTabIndex === 1) {
			newData = defaultQuotationData.elegantQuotation;
		} else {
			newData = defaultQuotationData.eliteQuotation;
		}

		if (isTabManuallySelected && areaEnum) {
			const matchingArea = newData.quotations.find(area => area.areaEnum === areaEnum);

			if (matchingArea) {
				const updatedData = { ...preDesignQuotationData };

				if (updatedData.quotations && updatedData.quotations[activeAreaIndex]) {
					updatedData.quotations[activeAreaIndex].products = matchingArea.products;
					updatedData.quotations[activeAreaIndex].type = matchingArea.type;
					setQuotationData(updatedData);
					return;
				}
			}
		}

		setQuotationData(preDesignQuotationData);
	}, [activeTabIndex, isTabManuallySelected, currentArea, preDesignQuotationData, defaultQuotationData]);

	const handleTabChange = (index: number) => {
		setActiveTabIndex(index);
		setIsTabManuallySelected(true);
	};

	const openImageDialog = (imageUrl: string) => {
		setSelectedImage(imageUrl);
		setDisplayImageDialog(true);
	};

	const calculateTotalPrice = products => {
		return products.reduce((sum, product) => sum + product.price, 0);
	};

	const getTotalQuotationPrice = () => {
		return quotationData?.quotations?.reduce(
			(sum, area) => sum + (area.subTotal || calculateTotalPrice(area.products)),
			0
		);
	};

	const getTypeLabel = (type: 'LITE' | 'ELEGANT' | 'ELITE') => {
		switch (type) {
			case 'LITE':
				return 'Budget Friendly';
			case 'ELEGANT':
				return 'Premium';
			case 'ELITE':
				return 'Luxury';
			default:
				return type;
		}
	};

	const imageBodyTemplate = product => {
		return (
			<div
				className="w-[120px] h-[80px] overflow-hidden rounded cursor-pointer flex items-center justify-center"
				onClick={() => openImageDialog(product.imageUrl)}
			>
				<img
					src={product.imageUrl}
					alt={product.productName}
					className=" w-full  h-full object-cover"
					style={{ borderRadius: '16px' }}
				/>
			</div>
		);
	};

	const nameBodyTemplate = product => {
		return (
			<div className="flex flex-col gap-1">
				<span className="font-medium text-gray-900">{product.productName}</span>
				{product.customise && (
					<div className="flex items-center text-sm text-blue-600 mt-1">
						<span>Customise</span>
						<i className="pi pi-pencil ml-1 text-xs"></i>
					</div>
				)}
			</div>
		);
	};

	const unitSizeTemplate = product => {
		return <div className="text-center font-medium text-gray-800">{product.unitOfMeasure}</div>;
	};

	const measurementTemplate = product => {
		return <div className="text-center font-medium text-gray-800">{product.quantity}</div>;
	};

	const packBodyTemplate = product => {
		return (
			<div className="text-center">
				<Tag
					value={getTypeLabel(product.type)}
					severity={product.type === 'LITE' ? 'info' : product.type === 'ELEGANT' ? 'success' : 'warning'}
					className="text-xs font-medium"
				/>
			</div>
		);
	};

	const priceBodyTemplate = product => {
		return <div className="text-right font-medium text-gray-900">{formatCurrencyINR(product.price)}</div>;
	};

	return (
		<>
			<div className="flex">
				<div className="w-[178px] bg-white border-gray-200">
					<ScrollPanel style={{ height: 'calc(100vh - 200px)' }} className="border-none">
						{quotationData?.quotations?.map((area, index) => (
							<Button
								key={area.areaEnum}
								className={`p-4 mb-4 text-left hover:bg-gray-50 transition-colors flex flex-col gap-2.5 h-[80px] w-4/5 bg-transparent m-0 ${
									index === activeAreaIndex
										? 'border border-black rounded-2xl m-2'
										: 'border border-[#F2F4FA] rounded-2xl m-2'
								}`}
								onClick={() => {
									setActiveAreaIndex(index);
									setIsTabManuallySelected(false);
								}}
							>
								<div className="font-medium text-gray-900">{area.areaName}</div>
								<div className="text-lg text-gray-600 plus-jakarta-sans-font">
									{formatCurrencyINR(area.subTotal || calculateTotalPrice(area.products))}
								</div>
							</Button>
						))}
						{/* <div className=" p-4 mb-4 w-4/5 border border-[#F2F4FA] rounded-2xl m-2">
							<div className="">Grand Total</div>
							<div className="text-xl font-bold text-gray-900 mt-1">
								{formatCurrencyINR(getTotalQuotationPrice())}
							</div>
						</div> */}
					</ScrollPanel>
					<div className=" p-4 mb-4 w-4/5 border border-[#F2F4FA] rounded-2xl m-2">
						<div className="">Grand Total</div>
						<div className="text-xl font-bold text-gray-900 mt-1">
							{formatCurrencyINR(getTotalQuotationPrice())}
						</div>
					</div>
				</div>

				<div className="flex-1 p-6 mb-4 border border-[#F2F4FA] rounded-2xl m-2">
					<div className="mb-6">
						<TabView
							activeIndex={activeTabIndex}
							onTabChange={e => handleTabChange(e.index)}
							className="border-none"
							pt={{
								root: { className: 'w-[268px] h-[30px] flex gap-2' },
								nav: { className: 'flex gap-2 border-none mb-2' },
								inkbar: { className: 'hidden' },
								navContent: { className: 'flex gap-2' }
							}}
						>
							<TabPanel
								header="Budget Friendly"
								pt={{
									headerAction: {
										className: `flex items-center justify-center cursor-pointer rounded-[52px] h-[30px] px-3 py-2 ${
											activeTabIndex === 0
												? 'bg-black text-white'
												: 'border border-[#2323231A] text-gray-700'
										}`
									},
									headerTitle: { className: 'text-sm font-medium' }
								}}
							/>
							<TabPanel
								header="Premium"
								pt={{
									headerAction: {
										className: `flex items-center justify-center cursor-pointer rounded-[52px] h-[30px] px-3 py-2 ${
											activeTabIndex === 1
												? 'bg-black text-white'
												: 'border border-[#2323231A] text-gray-700'
										}`
									},
									headerTitle: { className: 'text-sm font-medium' }
								}}
							/>
							<TabPanel
								header="Luxury"
								pt={{
									headerAction: {
										className: `flex items-center justify-center cursor-pointer rounded-[52px] h-[30px] px-3 py-2 ${
											activeTabIndex === 2
												? 'bg-black text-white'
												: 'border border-[#2323231A] text-gray-700'
										}`
									},
									headerTitle: { className: 'text-sm font-medium' }
								}}
							/>
						</TabView>
					</div>

					{quotationData?.quotations?.length > 0 && activeAreaIndex < quotationData.quotations.length && (
						<div>
							<DataTable
								value={quotationData.quotations[activeAreaIndex].products}
								className="p-datatable-sm"
								rowHover
								responsiveLayout="scroll"
								showGridlines={false}
								pt={{
									root: { className: 'border-none' },
									headerRow: { className: 'bg-white border-gray-200' },
									bodyRow: { className: ' border-gray-100' }
								}}
							>
								<Column
									field="image"
									// header="Product"
									body={imageBodyTemplate}
									style={{ width: '100px' }}
									pt={{
										headerCell: { className: 'text-gray-700 font-semibold invisible h-0' },
										bodyCell: { className: 'py-4' }
									}}
								/>
								<Column
									field="productName"
									header="Product"
									body={nameBodyTemplate}
									style={{ width: '25%' }}
									pt={{
										headerCell: { className: 'text-gray-700 font-semibold bg-transparent ' },
										bodyCell: { className: 'py-4' }
									}}
								/>
								<Column
									field="unitOfMeasure"
									header="Unit Size"
									body={unitSizeTemplate}
									className="text-center"
									style={{ width: '15%' }}
									pt={{
										headerCell: {
											className: 'text-gray-700 font-semibold text-center bg-transparent'
										},
										bodyCell: { className: 'py-4' }
									}}
								/>
								<Column
									field="quantity"
									header="Measurement"
									body={measurementTemplate}
									className="text-center"
									style={{ width: '15%' }}
									pt={{
										headerCell: {
											className: 'text-gray-700 font-semibold text-center bg-transparent'
										},
										bodyCell: { className: 'py-4' }
									}}
								/>
								{/* <Column
									field="type"
									header="Pack"
									body={packBodyTemplate}
									className="text-center"
									style={{ width: '15%' }}
									pt={{
										headerCell: {
											className: 'text-gray-700 font-semibold text-center bg-transparent'
										},
										bodyCell: { className: 'py-4' }
									}}
								/> */}
								<Column
									field="price"
									header="Total Cost Price"
									body={priceBodyTemplate}
									className="text-right plus-jakarta-sans-font"
									style={{ width: '20%' }}
									pt={{
										headerCell: {
											className: 'text-gray-700 font-semibold text-right bg-transparent'
										},
										bodyCell: { className: 'py-4' }
									}}
								/>
							</DataTable>
						</div>
					)}
				</div>
			</div>
			<div className="mt-8 flex justify-end">
				<Button
					label="Save and Continue"
					icon="pi pi-arrow-right"
					iconPos="right"
					className="px-4 py-2 bg-transparent text-black rounded-full"
				/>
			</div>

			<Dialog
				visible={displayImageDialog}
				onHide={() => setDisplayImageDialog(false)}
				style={{ width: 'auto', maxWidth: '90vw' }}
				contentClassName="p-0 bg-gray-100"
				showHeader={false}
				dismissableMask
				modal
				blockScroll
			>
				<div className="p-4 flex justify-center">
					<img src={selectedImage} alt="Product" className="max-w-full max-h-[70vh] object-contain" />
				</div>
			</Dialog>
		</>
	);
};

export default UpdateQuotationBreakupSelection;

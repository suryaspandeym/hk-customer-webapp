import { put, call, takeLatest, type CallEffect, type PutEffect, type ForkEffect } from 'redux-saga/effects';
import { ProjectActionType } from './enums';
import { handleEmptyNullValues, setItems, toast, uploadDocumentArr } from '@utilities';
import { addProjectDetails } from './api';
// import { activateDocument } from '../products/api';
import { AnyAction } from 'redux';
import { type ProjectAction } from './interfaces';

type ProjectSagaEffect = Generator<CallEffect<any> | PutEffect<ProjectAction>>;
type ProjectSagaFormEffect = Generator<ForkEffect<void>>;

export function* addProjectDetailsEffect(action: AnyAction): ProjectSagaEffect {
	const { formData, successCB, errorCB } = action.payload;
	// debugger;

	try {
		// const { data } = yield call(addProjectDetails, formData);
		successCB();
	} catch (error: any) {
		errorCB(error?.message);
	}
}

export function* fetchQuotationDataEffect(action: AnyAction): ProjectSagaEffect {
	const { predictionId, errorCB } = action.payload;
	// debugger;
	try {
		// const { data }: any = yield call(fetchQuotationData, predictionId);

		const data = {
			quotations: [
				{
					areaName: 'Living Room',
					areaEnum: 'LIVING',
					products: [
						{
							productId: '937f5d7d-93eb-40a8-9348-fe59046a5ade',
							productCategory: 'Modular Furniture',
							productSubCategory: 'Wooden Console',
							productName: 'Console',
							unitOfMeasure: 'UNIT',
							price: 12800.0,
							quantity: 1,
							calculation: 'W*H*R',
							type: 'LITE',
							unitCost: 12800.0,
							productGroup: 1,
							imageUrl:
								'https://housekraftml.s3.amazonaws.com/product_images/1%20Foyer%20Metal%20console.jpg'
						},
						{
							productId: '72d139a5-4340-4f29-b8ed-49c09cea0f8c',
							productCategory: 'Modular Furniture',
							productSubCategory: 'Wooden Console',
							productName: 'Console',
							unitOfMeasure: 'UNIT',
							price: 13500.0,
							quantity: 1,
							calculation: 'W*H*R',
							type: 'LITE',
							unitCost: 13500.0,
							productGroup: 1,
							imageUrl:
								'https://housekraftml.s3.amazonaws.com/product_images/2%20Foyer%20Metal%20console.jpg'
						},
						{
							productId: 'e58967ec-d2c0-4250-81dc-ca8604e66984',
							productCategory: 'Modular Furniture',
							productSubCategory: 'TV Unit',
							productName: 'TV Unit',
							unitOfMeasure: 'UNIT',
							measurement: {
								width: 1405,
								depth: 300,
								height: 2100,
								area: 2951660.891
							},
							price: 4000.0,
							quantity: 1,
							type: 'LITE',
							unitCost: 4000.0,
							productGroup: 2,
							imageUrl: 'https://housekraftml.s3.amazonaws.com/product_images/1%20TV%20Unit%20LITE.jpeg'
						},
						{
							productId: '59e5db32-7561-4b46-8aa0-2fb1c5b3a7c2',
							productCategory: 'Modular Furniture',
							productSubCategory: 'TV Unit',
							productName: 'TV Unit',
							unitOfMeasure: 'UNIT',
							measurement: {
								width: 1405,
								depth: 300,
								height: 2100,
								area: 2951660.891
							},
							price: 6700.0,
							quantity: 1,
							type: 'LITE',
							unitCost: 6700.0,
							productGroup: 2,
							imageUrl: 'https://housekraftml.s3.amazonaws.com/product_images/2%20TV%20Unit%20LITE.jpeg'
						},
						{
							productId: '6abe01a1-1bf0-4abe-a6f9-4337e6a615b0',
							productCategory: 'Modular Furniture',
							productSubCategory: 'TV Unit',
							productName: 'TV Unit',
							unitOfMeasure: 'UNIT',
							measurement: {
								width: 1405,
								depth: 300,
								height: 2100,
								area: 2951660.891
							},
							price: 6700.0,
							quantity: 1,
							type: 'LITE',
							unitCost: 6700.0,
							productGroup: 2,
							imageUrl: 'https://housekraftml.s3.amazonaws.com/product_images/3%20TV%20Unit%20LITE.jpeg'
						},
						{
							productId: 'd347dcbb-cf0e-42bd-9526-7fede20282d8',
							productCategory: 'Modular Furniture',
							productSubCategory: 'TV Unit',
							productName: 'TV Unit',
							unitOfMeasure: 'UNIT',
							measurement: {
								width: 1405,
								depth: 300,
								height: 2100,
								area: 2951660.891
							},
							price: 11000.0,
							quantity: 1,
							type: 'LITE',
							unitCost: 11000.0,
							productGroup: 2,
							imageUrl: 'https://housekraftml.s3.amazonaws.com/product_images/4%20TV%20Unit%20LITE.jpeg'
						}
					],
					type: 'LITE',
					subTotal: 48188.96294459255
				},
				{
					areaName: 'Kitchen',
					areaEnum: 'KITCHEN',
					products: [
						{
							productId: '68223633-cabd-4b7c-b5ed-71c0fc25a793',
							productCategory: 'Wall Treatment',
							productSubCategory: 'Wall/Ceiling Painting',
							productName: 'Wall Paint Emulsion',
							unitOfMeasure: 'SQFT',
							measurement: {
								width: 7362,
								height: 2750,
								area: 2.0247417394e7
							},
							price: 4358.414966829934,
							quantity: 1,
							calculation: 'W*H*R',
							type: 'ELEGANT',
							unitCost: 20.0,
							productGroup: 1,
							imageUrl: 'https://housekraftml.s3.amazonaws.com/product_images/02%20Premium%20Emulsion.jpg'
						},
						{
							productId: '7fd2f1f1-bd6b-41b8-887d-c7bd6fb8c59f',
							productCategory: 'Lighting',
							productSubCategory: 'Ceiling Light',
							productName: 'Recessed Light',
							unitOfMeasure: 'UNIT',
							measurement: {
								area: 8158005.065
							},
							price: 500.0,
							quantity: 1,
							calculation: 'UNIT',
							type: 'ELEGANT',
							unitCost: 500.0,
							productGroup: 4,
							imageUrl:
								'https://housekraftml.s3.amazonaws.com/product_images/2%2015W%20SURFACE%20SLIM%20PANEL%20LIGHT%20SQUARE.jpg'
						}
					],
					type: 'ELEGANT',
					subTotal: 48188.96294459255
				},
				{
					areaName: 'Bedroom 2',
					areaEnum: 'BEDROOM',
					products: [
						{
							productId: '8372e637-3654-4a48-ab82-145578d4a806',
							productCategory: 'Wall Treatment',
							productSubCategory: 'Panelling',
							productName: 'Wall Geometrical Moulding',
							unitOfMeasure: 'SQFT',
							measurement: {
								width: 5050,
								height: 2100,
								area: 10606090.971
							},
							price: 5707.563498460329,
							quantity: 1,
							calculation: 'W*H*R',
							type: 'ELEGANT',
							unitCost: 50.0,
							productGroup: 1,
							imageUrl: 'https://housekraftml.s3.amazonaws.com/product_images/1%20Wall%20Moulding%20.jpg'
						},
						{
							productId: '8cdca4bd-0958-4a36-987b-829dacb4e48e',
							productCategory: 'Wall Treatment',
							productSubCategory: 'Panelling',
							productName: 'Wall Geometrical Moulding',
							unitOfMeasure: 'SQFT',
							measurement: {
								width: 5050,
								height: 2100,
								area: 10606090.971
							},
							price: 5707.563498460329,
							quantity: 1,
							calculation: 'W*H*R',
							type: 'ELEGANT',
							unitCost: 50.0,
							productGroup: 1,
							imageUrl: 'https://housekraftml.s3.amazonaws.com/product_images/2%20Wall%20Moulding%20.jpg'
						},
						{
							productId: '371e5228-bd72-44c3-a180-9ac5f67aef1f',
							productCategory: 'Wall Treatment',
							productSubCategory: 'Panelling',
							productName: 'Wall Geometrical Moulding',
							unitOfMeasure: 'SQFT',
							measurement: {
								width: 5050,
								height: 2100,
								area: 10606090.971
							},
							price: 5707.563498460329,
							quantity: 1,
							calculation: 'W*H*R',
							type: 'ELEGANT',
							unitCost: 50.0,
							productGroup: 2,
							xorGroup: 2,
							imageUrl: 'https://housekraftml.s3.amazonaws.com/product_images/3%20Wall%20Moulding%20.jpg'
						},
						{
							productId: 'b1b4916c-2c57-4f7f-abda-d221deb4fff7',
							productCategory: 'Wall Treatment',
							productSubCategory: 'Panelling',
							productName: 'Wall Geometrical Moulding',
							unitOfMeasure: 'SQFT',
							measurement: {
								width: 5050,
								height: 2100,
								area: 10606090.971
							},
							price: 5707.563498460329,
							quantity: 1,
							calculation: 'W*H*R',
							type: 'ELEGANT',
							unitCost: 50.0,
							productGroup: 2,
							xorGroup: 2,
							imageUrl: 'https://housekraftml.s3.amazonaws.com/product_images/4%20Wall%20Moulding%20.jpg'
						},
						{
							productId: 'c6a9a16e-5d77-42b7-8b0e-83275ff2d4fb',
							productCategory: 'Wall Treatment',
							productSubCategory: 'Panelling',
							productName: 'Wall Vertical Panels',
							unitOfMeasure: 'SQFT',
							measurement: {
								width: 5000,
								height: 2000,
								area: 10000000.0
							},
							price: 5500.0,
							quantity: 1,
							calculation: 'W*H*R',
							type: 'ELEGANT',
							unitCost: 48.0,
							productGroup: 3,
							xorGroup: 2,
							imageUrl: 'https://housekraftml.s3.amazonaws.com/product_images/5%20Wall%20Moulding%20.jpg'
						},
						{
							productId: 'd4e6b9f7-1a33-45ad-889a-94551ff456b7',
							productCategory: 'Wall Treatment',
							productSubCategory: 'Panelling',
							productName: 'Wall Textured Finish',
							unitOfMeasure: 'SQFT',
							measurement: {
								width: 4900,
								height: 1900,
								area: 9310000.0
							},
							price: 5300.0,
							quantity: 1,
							calculation: 'W*H*R',
							type: 'ELEGANT',
							unitCost: 47.0,
							productGroup: 4,
							xorGroup: 2,
							imageUrl: 'https://housekraftml.s3.amazonaws.com/product_images/6%20Wall%20Moulding%20.jpg'
						}
					]
				}
			]
		};

		yield put({
			type: ProjectActionType.STORE_QUOTATION_DETAILS,
			payload: data
		});
	} catch (error: any) {
		console.log(error);
		errorCB(error?.message);
	}
}

export function* getPreDesignQuotationEffect(action: AnyAction): any {
	const { successCB, selectedAreas, budget, errorCB } = action.payload;

	try {
		const data = {
			quotations: [
				{
					areaName: 'Living Room',
					areaEnum: 'LIVING',
					products: [
						{
							productId: '937f5d7d-93eb-40a8-9348-fe59046a5ade',
							productCategory: 'Modular Furniture',
							productSubCategory: 'Wooden Console',
							productName: 'Console',
							unitOfMeasure: 'UNIT',
							price: 12800.0,
							quantity: 1,
							calculation: 'W*H*R',
							type: 'LITE',
							unitCost: 12800.0,
							productGroup: 1,
							imageUrl:
								'https://housekraftml.s3.amazonaws.com/product_images/1%20Foyer%20Metal%20console.jpg'
						},
						{
							productId: '72d139a5-4340-4f29-b8ed-49c09cea0f8c',
							productCategory: 'Modular Furniture',
							productSubCategory: 'Wooden Console',
							productName: 'Console',
							unitOfMeasure: 'UNIT',
							price: 13500.0,
							quantity: 1,
							calculation: 'W*H*R',
							type: 'LITE',
							unitCost: 13500.0,
							productGroup: 1,
							imageUrl:
								'https://housekraftml.s3.amazonaws.com/product_images/2%20Foyer%20Metal%20console.jpg'
						},
						{
							productId: 'e58967ec-d2c0-4250-81dc-ca8604e66984',
							productCategory: 'Modular Furniture',
							productSubCategory: 'TV Unit',
							productName: 'TV Unit',
							unitOfMeasure: 'UNIT',
							measurement: {
								width: 1405,
								depth: 300,
								height: 2100,
								area: 2951660.891
							},
							price: 4000.0,
							quantity: 1,
							type: 'LITE',
							unitCost: 4000.0,
							productGroup: 2,
							imageUrl: 'https://housekraftml.s3.amazonaws.com/product_images/1%20TV%20Unit%20LITE.jpeg'
						},
						{
							productId: '59e5db32-7561-4b46-8aa0-2fb1c5b3a7c2',
							productCategory: 'Modular Furniture',
							productSubCategory: 'TV Unit',
							productName: 'TV Unit',
							unitOfMeasure: 'UNIT',
							measurement: {
								width: 1405,
								depth: 300,
								height: 2100,
								area: 2951660.891
							},
							price: 6700.0,
							quantity: 1,
							type: 'LITE',
							unitCost: 6700.0,
							productGroup: 2,
							imageUrl: 'https://housekraftml.s3.amazonaws.com/product_images/2%20TV%20Unit%20LITE.jpeg'
						},
						{
							productId: '6abe01a1-1bf0-4abe-a6f9-4337e6a615b0',
							productCategory: 'Modular Furniture',
							productSubCategory: 'TV Unit',
							productName: 'TV Unit',
							unitOfMeasure: 'UNIT',
							measurement: {
								width: 1405,
								depth: 300,
								height: 2100,
								area: 2951660.891
							},
							price: 6700.0,
							quantity: 1,
							type: 'LITE',
							unitCost: 6700.0,
							productGroup: 2,
							imageUrl: 'https://housekraftml.s3.amazonaws.com/product_images/3%20TV%20Unit%20LITE.jpeg'
						},
						{
							productId: 'd347dcbb-cf0e-42bd-9526-7fede20282d8',
							productCategory: 'Modular Furniture',
							productSubCategory: 'TV Unit',
							productName: 'TV Unit',
							unitOfMeasure: 'UNIT',
							measurement: {
								width: 1405,
								depth: 300,
								height: 2100,
								area: 2951660.891
							},
							price: 11000.0,
							quantity: 1,
							type: 'LITE',
							unitCost: 11000.0,
							productGroup: 2,
							imageUrl: 'https://housekraftml.s3.amazonaws.com/product_images/4%20TV%20Unit%20LITE.jpeg'
						}
					],
					type: 'LITE',
					subTotal: 48188.96294459255
				},
				{
					areaName: 'Kitchen',
					areaEnum: 'KITCHEN',
					products: [
						{
							productId: '68223633-cabd-4b7c-b5ed-71c0fc25a793',
							productCategory: 'Wall Treatment',
							productSubCategory: 'Wall/Ceiling Painting',
							productName: 'Wall Paint Emulsion',
							unitOfMeasure: 'SQFT',
							measurement: {
								width: 7362,
								height: 2750,
								area: 2.0247417394e7
							},
							price: 4358.414966829934,
							quantity: 1,
							calculation: 'W*H*R',
							type: 'ELEGANT',
							unitCost: 20.0,
							productGroup: 1,
							imageUrl: 'https://housekraftml.s3.amazonaws.com/product_images/02%20Premium%20Emulsion.jpg'
						},
						{
							productId: '7fd2f1f1-bd6b-41b8-887d-c7bd6fb8c59f',
							productCategory: 'Lighting',
							productSubCategory: 'Ceiling Light',
							productName: 'Recessed Light',
							unitOfMeasure: 'UNIT',
							measurement: {
								area: 8158005.065
							},
							price: 500.0,
							quantity: 1,
							calculation: 'UNIT',
							type: 'ELEGANT',
							unitCost: 500.0,
							productGroup: 4,
							imageUrl:
								'https://housekraftml.s3.amazonaws.com/product_images/2%2015W%20SURFACE%20SLIM%20PANEL%20LIGHT%20SQUARE.jpg'
						}
					],
					type: 'ELEGANT',
					subTotal: 48188.96294459255
				},
				{
					areaName: 'Bedroom 2',
					areaEnum: 'BEDROOM',
					products: [
						{
							productId: '8372e637-3654-4a48-ab82-145578d4a806',
							productCategory: 'Wall Treatment',
							productSubCategory: 'Panelling',
							productName: 'Wall Geometrical Moulding',
							unitOfMeasure: 'SQFT',
							measurement: {
								width: 5050,
								height: 2100,
								area: 10606090.971
							},
							price: 5707.563498460329,
							quantity: 1,
							calculation: 'W*H*R',
							type: 'ELEGANT',
							unitCost: 50.0,
							productGroup: 1,
							imageUrl: 'https://housekraftml.s3.amazonaws.com/product_images/1%20Wall%20Moulding%20.jpg'
						},
						{
							productId: '8cdca4bd-0958-4a36-987b-829dacb4e48e',
							productCategory: 'Wall Treatment',
							productSubCategory: 'Panelling',
							productName: 'Wall Geometrical Moulding',
							unitOfMeasure: 'SQFT',
							measurement: {
								width: 5050,
								height: 2100,
								area: 10606090.971
							},
							price: 5707.563498460329,
							quantity: 1,
							calculation: 'W*H*R',
							type: 'ELEGANT',
							unitCost: 50.0,
							productGroup: 1,
							imageUrl: 'https://housekraftml.s3.amazonaws.com/product_images/2%20Wall%20Moulding%20.jpg'
						},
						{
							productId: '371e5228-bd72-44c3-a180-9ac5f67aef1f',
							productCategory: 'Wall Treatment',
							productSubCategory: 'Panelling',
							productName: 'Wall Geometrical Moulding',
							unitOfMeasure: 'SQFT',
							measurement: {
								width: 5050,
								height: 2100,
								area: 10606090.971
							},
							price: 5707.563498460329,
							quantity: 1,
							calculation: 'W*H*R',
							type: 'ELEGANT',
							unitCost: 50.0,
							productGroup: 2,
							xorGroup: 2,
							imageUrl: 'https://housekraftml.s3.amazonaws.com/product_images/3%20Wall%20Moulding%20.jpg'
						},
						{
							productId: 'b1b4916c-2c57-4f7f-abda-d221deb4fff7',
							productCategory: 'Wall Treatment',
							productSubCategory: 'Panelling',
							productName: 'Wall Geometrical Moulding',
							unitOfMeasure: 'SQFT',
							measurement: {
								width: 5050,
								height: 2100,
								area: 10606090.971
							},
							price: 5707.563498460329,
							quantity: 1,
							calculation: 'W*H*R',
							type: 'ELEGANT',
							unitCost: 50.0,
							productGroup: 2,
							xorGroup: 2,
							imageUrl: 'https://housekraftml.s3.amazonaws.com/product_images/4%20Wall%20Moulding%20.jpg'
						},
						{
							productId: 'c6a9a16e-5d77-42b7-8b0e-83275ff2d4fb',
							productCategory: 'Wall Treatment',
							productSubCategory: 'Panelling',
							productName: 'Wall Vertical Panels',
							unitOfMeasure: 'SQFT',
							measurement: {
								width: 5000,
								height: 2000,
								area: 10000000.0
							},
							price: 5500.0,
							quantity: 1,
							calculation: 'W*H*R',
							type: 'ELEGANT',
							unitCost: 48.0,
							productGroup: 3,
							xorGroup: 2,
							imageUrl: 'https://housekraftml.s3.amazonaws.com/product_images/5%20Wall%20Moulding%20.jpg'
						},
						{
							productId: 'd4e6b9f7-1a33-45ad-889a-94551ff456b7',
							productCategory: 'Wall Treatment',
							productSubCategory: 'Panelling',
							productName: 'Wall Textured Finish',
							unitOfMeasure: 'SQFT',
							measurement: {
								width: 4900,
								height: 1900,
								area: 9310000.0
							},
							price: 5300.0,
							quantity: 1,
							calculation: 'W*H*R',
							type: 'ELEGANT',
							unitCost: 47.0,
							productGroup: 4,
							xorGroup: 2,
							imageUrl: 'https://housekraftml.s3.amazonaws.com/product_images/6%20Wall%20Moulding%20.jpg'
						}
					]
				}
			]
		};
		// const { data }: any = yield call(getPreDesignQuotation, { areas: selectedAreas, budget: budget });

		yield put({
			type: ProjectActionType.STORE_PRE_DESIGN_QUOTATION,
			payload: data
		});
		successCB(data);
	} catch (error: any) {
		yield put({
			type: ProjectActionType.ERROR_PRE_DESIGN_QUOTATION,
			payload: {
				error
			}
		});
		if (errorCB) {
			errorCB(error?.message);
		}
	}
}

export function* getDefaultQuotationsEffect(action: AnyAction): any {
	const { selectedAreas, budget, errorCB } = action.payload;
	debugger;

	try {
		// const { data }: any = yield call(getDefaultQuotations, { areas: selectedAreas, budget: budget });
		const data = {
			liteQuotation: {
				quotations: [
					{
						areaName: 'Living',
						areaEnum: 'LIVING',
						products: [
							{
								productId: '79364c13-42ca-44fc-9a4e-327b0559a537',
								productCategory: 'Wall Treatment',
								productSubCategory: 'Wall/Ceiling Painting',
								productName: 'Wall Paint Emulsion',
								unitOfMeasure: 'SQFT',
								measurement: {
									width: 3838,
									depth: 0,
									height: 2750,
									area: 10554989.934
								},
								price: 2272.15,
								quantity: 1,
								calculation: 'W*H*R',
								type: 'LITE',
								unitCost: 20,
								productGroup: 1,
								xorGroup: 0,
								imageUrl:
									'https://housekraftml.s3.amazonaws.com/product_images/1%20Foyer%20Metal%20console.jpg'
							},
							{
								productId: '123e4567-e89b-12d3-a456-426614174000',
								productCategory: 'Flooring',
								productSubCategory: 'Tiles',
								productName: 'Ceramic Floor Tiles',
								unitOfMeasure: 'SQFT',
								measurement: {
									width: 5000,
									depth: 0,
									height: 0,
									area: 5000
								},
								price: 5000,
								quantity: 1,
								calculation: 'W*D',
								type: 'LITE',
								unitCost: 50,
								productGroup: 2,
								xorGroup: 1,
								imageUrl:
									'https://housekraftml.s3.amazonaws.com/product_images/1%20Foyer%20Metal%20console.jpg'
							}
						],
						type: 'LITE',
						subTotal: 7272.15
					}
				],
				total: 7272.15
			},
			elegantQuotation: {
				quotations: [
					{
						areaName: 'Foyer',
						areaEnum: 'FOYER',
						products: [
							{
								productId: '05cf353d-235f-4826-b682-e15e1e9e4301',
								productCategory: 'Lighting',
								productSubCategory: 'Chandelier',
								productName: 'Luxury Chandelier',
								unitOfMeasure: 'SQFT',
								measurement: {
									width: 230,
									depth: 440,
									height: 90,
									area: 0
								},
								price: 3500,
								quantity: 1,
								calculation: 'W*H*D',
								type: 'ELEGANT',
								unitCost: 3500,
								productGroup: 3,
								xorGroup: 0,
								imageUrl:
									'https://housekraftml.s3.amazonaws.com/product_images/1%20Foyer%20Metal%20console.jpg'
							},
							{
								productId: '847b7c8f-ec7d-4e83-998d-3f03a89a5c6b',
								productCategory: 'Furniture',
								productSubCategory: 'Console Table',
								productName: 'Modern Entryway Console',
								unitOfMeasure: 'SQFT',
								measurement: {
									width: 1200,
									depth: 400,
									height: 800,
									area: 0
								},
								price: 2000,
								quantity: 1,
								calculation: 'W*H*D',
								type: 'ELEGANT',
								unitCost: 2000,
								productGroup: 3,
								xorGroup: 1,
								imageUrl:
									'https://housekraftml.s3.amazonaws.com/product_images/1%20Foyer%20Metal%20console.jpg'
							}
						],
						type: 'ELEGANT',
						subTotal: 5500
					}
				],
				total: 5500
			},
			eliteQuotation: {
				quotations: [
					{
						areaName: 'Living Room',
						areaEnum: 'LIVING',
						products: [
							{
								productId: '3349a438-93de-45d1-9b0c-e0d4b4099926',
								productCategory: 'Lighting',
								productSubCategory: 'Recessed Lighting',
								productName: 'Modern LED Downlight',
								unitOfMeasure: 'UNIT',
								measurement: {
									width: 789,
									depth: 446,
									height: 232,
									area: 12232
								},
								price: 1200,
								quantity: 4,
								calculation: 'UNIT',
								type: 'ELITE',
								unitCost: 300,
								productGroup: 4,
								xorGroup: 0,
								imageUrl:
									'https://housekraftml.s3.amazonaws.com/product_images/1%20Foyer%20Metal%20console.jpg'
							},
							{
								productId: 'ad2c4ff5-d8b4-44c6-b2a2-b0a1d51a3448',
								productCategory: 'Furniture',
								productSubCategory: 'Sofa',
								productName: 'Luxury Leather Sofa',
								unitOfMeasure: 'SQFT',
								measurement: {
									width: 2500,
									depth: 1000,
									height: 900,
									area: 0
								},
								price: 12000,
								quantity: 1,
								calculation: 'W*H*D',
								type: 'ELITE',
								unitCost: 12000,
								productGroup: 5,
								xorGroup: 1,
								imageUrl:
									'https://housekraftml.s3.amazonaws.com/product_images/1%20Foyer%20Metal%20console.jpg'
							}
						],
						type: 'ELITE',
						subTotal: 16800
					}
				],
				total: 16800
			}
		};

		yield put({
			type: ProjectActionType.STORE_DEFAULT_QUOTATION,
			payload: data
		});
	} catch (error: any) {
		yield put({
			type: ProjectActionType.ERROR_DEFAULT_QUOTATION,
			payload: {
				error
			}
		});
		if (errorCB) {
			errorCB(error?.message);
		}
	}
}

export function* addProjectDetailsSaga(): ProjectSagaFormEffect {
	yield takeLatest(ProjectActionType.ADD_PROJECT_DETAILS, addProjectDetailsEffect);
}

export function* fetchQuotationDataSaga(): ProjectSagaFormEffect {
	yield takeLatest(ProjectActionType.FETCH_QUOTATION_DETAILS, fetchQuotationDataEffect);
}

export function* getPreDesignQuotationSaga(): ProjectSagaFormEffect {
	yield takeLatest(ProjectActionType.GET_PRE_DESIGN_QUOTATION, getPreDesignQuotationEffect);
}

export function* getDefaultQuotationsSaga(): ProjectSagaFormEffect {
	yield takeLatest(ProjectActionType.GET_DEFAULT_QUOTATION, getDefaultQuotationsEffect);
}

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

export function* addProjectDetailsSaga(): ProjectSagaFormEffect {
	yield takeLatest(ProjectActionType.ADD_PROJECT_DETAILS, addProjectDetailsEffect);
}

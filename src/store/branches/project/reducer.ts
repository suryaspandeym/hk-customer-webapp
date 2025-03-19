import { ProjectActionType } from './enums';
import { ProjectState, ProjectAction } from './interfaces';

export const initialState: ProjectState = {
	quotationData: {},
	preDesignQuotation: {},
	defaultQuotations: {}
};

export default (state = initialState, { type, payload }: ProjectAction): ProjectState => {
	switch (type) {
		case ProjectActionType.ADD_PROJECT_DETAILS:
			return {
				...state
			};
		case ProjectActionType.STORE_QUOTATION_DETAILS:
			return {
				...state,
				quotationData: payload
			};

		case ProjectActionType.STORE_PRE_DESIGN_QUOTATION:
			return {
				...state,
				preDesignQuotation: payload
			};

		case ProjectActionType.STORE_DEFAULT_QUOTATION:
			return {
				...state,
				defaultQuotations: payload
			};

		default:
			return state;
	}
};

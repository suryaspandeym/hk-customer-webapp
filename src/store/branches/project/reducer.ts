import { ProjectActionType } from './enums';
import { ProjectState, ProjectAction } from './interfaces';

export const initialState: ProjectState = {
	loading: false,
	error: false,
	leadId: '',
	projectId: '',
	projectName: '',
	leadName: '',
	sessionID: '',
	userDetails: {},
	quotations: [],
	floorPlanDocURL: '',
	predictionId: '',
	predictionStatus: null,
	isPolling: false,
	predictionData: [],
	preDesignQuotation: [],
	budget: '',
	defaultQuotations: {},
	floorPlanImages: [],
	selectedQuotation: {},
	quotationsLoading: false
};

export default (state = initialState, { type, payload }: ProjectAction): ProjectState => {
	switch (type) {
		case ProjectActionType.ADD_PROJECT_DETAILS:
			return {
				...state
			};

		default:
			return state;
	}
};

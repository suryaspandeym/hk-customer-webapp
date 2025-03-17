import { type ProjectActionType } from './enums';

export interface ProjectState {
	[x: string]: any;
}
export interface ProjectAction {
	type: ProjectActionType;
	payload?: Partial<ProjectState> | any;
}

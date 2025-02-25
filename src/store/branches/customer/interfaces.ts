import { type CustomerActionType } from './enums';

export interface CustomerState {
	loading: boolean;
	error: any;
	sessionID: any;
	// quotationId: any;
	quotations: any;
	leadId: any;

	[x: string]: any;
}
export interface CustomerAction {
	type: CustomerActionType;
	payload?: Partial<CustomerState> | any;
}

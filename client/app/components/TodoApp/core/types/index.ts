export type ItemStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TodoDataResponse = {
	id: string;
	name: string;
	description: string;
	status: ItemStatus;
	createdAt: string;
	updatedAt: string;
}[];

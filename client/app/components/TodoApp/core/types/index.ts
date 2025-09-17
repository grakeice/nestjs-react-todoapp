export type ItemStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TodoDataResponse = {
	id: string;
	name: string;
	description: string | null;
	status: ItemStatus;
	dueDate: string | null;
	createdAt: string;
	updatedAt: string;
}[];

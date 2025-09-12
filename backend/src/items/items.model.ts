export interface Item {
	id: string;
	name: string;
	description: string;
	status: ItemStatus;
	createdAt: Date;
	updatedAt: Date;
}

export type ItemStatus = "TODO" | "IN_PROGRESS" | "DONE";

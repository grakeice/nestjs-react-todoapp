import type { ItemStatus } from "generated/prisma";

export interface Item {
	id: string;
	name: string;
	description: string;
	status: ItemStatus;
	createdAt: Date;
	updatedAt: Date;
}

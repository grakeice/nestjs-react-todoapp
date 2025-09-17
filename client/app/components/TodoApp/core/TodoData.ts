import type { ItemStatus } from "./types";

interface ITodoData {
	id: string;
	name: string;
	description?: string | null;
	status: ItemStatus;
	dueDate?: Date | null;
	createdAt: Date;
	updatedAt: Date;
}

interface TodoDataConstructorArguments {
	id: string;
	name: string;
	description?: string | null;
	status: ItemStatus;
	dueDate?: Date | null;
	createdAt?: Date;
	updatedAt?: Date;
}

export class TodoData implements ITodoData {
	id: string;
	name: string;
	description?: string | null;
	status: ItemStatus;
	dueDate?: Date | null;
	createdAt: Date;
	updatedAt: Date;
	constructor({
		id,
		name,
		description,
		status,
		dueDate,
		createdAt,
		updatedAt,
	}: TodoDataConstructorArguments) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.status = status;
		this.dueDate = dueDate;
		this.createdAt = createdAt ?? new Date();
		this.updatedAt = updatedAt ?? new Date();
	}
}

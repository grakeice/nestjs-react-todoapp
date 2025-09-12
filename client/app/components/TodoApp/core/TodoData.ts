import type { ItemStatus } from "./types";

interface ITodoData {
	id: string;
	name: string;
	description?: string;
	status: ItemStatus;
	createdAt: Date;
	updatedAt: Date;
}

interface TodoDataConstructorArguments {
	id: string;
	name: string;
	description?: string;
	status: ItemStatus;
	createdAt?: Date;
	updatedAt?: Date;
}

export class TodoData implements ITodoData {
	id: string;
	name: string;
	description?: string;
	status: ItemStatus;
	createdAt: Date;
	updatedAt: Date;
	constructor({
		id,
		name,
		description,
		status,
		createdAt,
		updatedAt,
	}: TodoDataConstructorArguments) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.status = status;
		this.createdAt = createdAt ?? new Date();
		this.updatedAt = updatedAt ?? new Date();
	}
}

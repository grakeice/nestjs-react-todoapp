import type { ItemStatus } from "./types";

interface ITask {
	id: string;
	name: string;
	description?: string | null;
	status: ItemStatus;
	dueDate?: Date | null;
	createdAt: Date;
	updatedAt: Date;
}

interface TaskConstructorArguments {
	id?: string;
	name: string;
	description?: string | null;
	status: ItemStatus;
	dueDate?: Date | null;
	createdAt?: Date;
	updatedAt?: Date;
}

export class Task implements ITask {
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
	}: TaskConstructorArguments) {
		this.id = id ?? crypto.randomUUID();
		this.name = name;
		this.description = description;
		this.status = status;
		this.dueDate = dueDate;
		this.createdAt = createdAt ?? new Date();
		this.updatedAt = updatedAt ?? new Date();
	}
	static sort(items: Task[]) {
		return [...items]
			.sort((a, b) => {
				if (a.createdAt > b.createdAt) {
					return 1;
				} else {
					return -1;
				}
			})
			.sort((a, b) => {
				if (a.dueDate && b.dueDate) {
					return a.dueDate.getTime() - b.dueDate.getTime();
				} else if (a.dueDate && !b.dueDate) {
					return -1;
				} else if (!a.dueDate && b.dueDate) {
					return 1;
				} else {
					return 0;
				}
			});
	}
}

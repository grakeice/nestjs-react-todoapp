import type { ItemStatus } from "~/components/TodoApp/core/types";

export class TodoService {
	private static instance: TodoService;
	private host: URL = new URL("http://127.0.0.1:3000/items/id");

	static getInstance() {
		TodoService.instance ??= new TodoService();
		return TodoService.instance;
	}

	async delete(id: string) {
		const url = new URL(id, this.host).href;
		const res = await fetch(url, { method: "DELETE" });
		return res;
	}

	async findAll() {
		const url = new URL(".", this.host).href;
		const res = await fetch(url, { method: "GET" });
		return res;
	}

	async update(
		id: string,
		data: {
			name?: string;
			dueDate?: Date;
			status?: ItemStatus;
			description?: string;
		},
	) {
		const url = new URL(id, this.host).href;

		const res = await fetch(url, {
			method: "PUT",
			body: JSON.stringify({
				name: data.name,
				dueDate: data.dueDate,
				status: data.status,
				description: data.description,
			}),
			headers: { "Content-Type": "application/json" },
		});
		return res;
	}

	async create(data: {
		name?: string;
		dueDate?: Date;
		status?: ItemStatus;
		description?: string;
	}) {
		const url = new URL(".", this.host).href;

		const res = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				name: data.name,
				dueDate: data.dueDate,
				status: data.status,
				description: data.description,
			}),
			headers: { "Content-Type": "application/json" },
		});
		return res;
	}
}

export const todoService = TodoService.getInstance();

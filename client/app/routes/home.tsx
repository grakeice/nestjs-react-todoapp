import { type ActionFunctionArgs, useLoaderData } from "react-router";

import { TodoApp } from "~/components/TodoApp";
import type {
	ItemStatus,
	TaskDataResponse,
} from "~/components/TodoApp/core/types";
import { todoService } from "~/services/TodoService";

import type { Route } from "./+types/home";

// biome-ignore lint/correctness/noEmptyPattern: initial
export function meta({}: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}
export async function clientLoader() {
	const res = await todoService.findAll();
	const data = (await res.json()) as TaskDataResponse;
	return data;
}

clientLoader.hydrate = true as const;

export async function clientAction({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const intent = formData.get("_action");
	switch (intent) {
		case "delete": {
			const id = formData.get("id")?.toString();
			console.log(id);
			if (id) await todoService.delete(id);
			break;
		}
		case "update": {
			const id = formData.get("id")?.toString();
			const name = formData.get("name")?.toString();
			const dueDate = formData.get("dueDate")?.toString();
			const description = formData.get("description")?.toString();
			const status = formData.get("status")?.toString();
			if (id) {
				const res = await todoService.update(id, {
					name,
					dueDate: dueDate ? new Date(dueDate) : undefined,
					description,
					status: status as ItemStatus,
				});
				const result = await res.json();
				console.log(result);
			}
			break;
		}
		case "create": {
			const name = formData.get("name")?.toString();
			const dueDate = formData.get("dueDate")?.toString();
			const description = formData.get("description")?.toString();
			const status = formData.get("status")?.toString();

			const res = await todoService.create({
				name,
				dueDate: dueDate ? new Date(dueDate) : undefined,
				description,
				status: status as ItemStatus,
			});
			const result = await res.json();
			console.log(result);
			break;
		}

		case "edit": {
			const id = formData.get("id")?.toString();
			const name = formData.get("name")?.toString();
			const dueDate = formData.get("dueDate")?.toString();
			const description = formData.get("description")?.toString();
			const status = formData.get("status")?.toString();

			if (id) {
				const res = await todoService.update(id, {
					name,
					dueDate: dueDate ? new Date(dueDate) : undefined,
					description,
					status: status as ItemStatus,
				});
				const result = await res.json();
				console.log(result);
			}
			break;
		}
	}
	const data = await todoService.findAll();
	return await data.json();
}

export function HydrateFallback() {
	return <div>Loading...</div>;
}

export default function Home() {
	const data = useLoaderData<typeof clientLoader>();
	return <TodoApp data={data} />;
}

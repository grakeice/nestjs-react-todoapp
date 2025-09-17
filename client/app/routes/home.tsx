import { useLoaderData } from "react-router";

import { TodoApp } from "~/components/TodoApp";
import type { TaskDataResponse } from "~/components/TodoApp/core/types";
import { Container } from "@radix-ui/themes";

import type { Route } from "./+types/home";

// biome-ignore lint/correctness/noEmptyPattern: initial
export function meta({}: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}
export async function clientLoader() {
	const res = await fetch("http://127.0.0.1:3000/items", { mode: "cors" });
	const data = (await res.json()) as TaskDataResponse;
	return data;
}

clientLoader.hydrate = true as const;

export function HydrateFallback() {
	return <div>Loading...</div>;
}

export default function Home() {
	const data = useLoaderData<typeof clientLoader>();
	return (
		<Container>
			<TodoApp data={data} />
		</Container>
	);
}

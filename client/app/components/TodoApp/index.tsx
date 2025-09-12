import { type JSX, useEffect, useRef } from "react";

import { TodoData } from "./core/TodoData";
import type { TodoDataResponse } from "./core/types";
import { TodoList } from "./TodoList";

interface TodoAppProps {
	data: TodoDataResponse;
}

export function TodoApp({ ...props }: TodoAppProps): JSX.Element {
	const items = useRef<TodoData[]>([]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: run once after loaded
	useEffect(() => {
		const defaultItems = props.data.map((item) => {
			return new TodoData({
				...item,
				createdAt: new Date(item.createdAt),
				updatedAt: new Date(item.updatedAt),
			});
		});
		items.current = defaultItems;
	}, []);

	return <TodoList data={items.current} />;
}

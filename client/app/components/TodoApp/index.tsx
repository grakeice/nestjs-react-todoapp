import { type JSX, useRef } from "react";

import { Task } from "./core/Task";
import type { TaskDataResponse } from "./core/types";
import { TodoList } from "./TodoList";

interface TodoAppProps {
	data: TaskDataResponse;
}

export function TodoApp({ ...props }: TodoAppProps): JSX.Element {
	const items = useRef<Task[]>([]);

	const defaultItems = props.data.map((item) => {
		return new Task({
			...item,
			dueDate: item.dueDate ? new Date(item.dueDate) : null,
			createdAt: new Date(item.createdAt),
			updatedAt: new Date(item.updatedAt),
		});
	});
	items.current = defaultItems;

	return <TodoList data={items.current} />;
}

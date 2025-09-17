import { type JSX, useState } from "react";
import { useFetcher } from "react-router";

import { SidebarIcon } from "lucide-react";
import { Container } from "@radix-ui/themes";

import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Task } from "./core/Task";
import type { TaskDataResponse } from "./core/types";
import { EditTask } from "./Modals/EditTask";
import { TodoList } from "./TodoList";

interface TodoAppProps {
	data: TaskDataResponse;
}

export function TodoApp({ data }: TodoAppProps): JSX.Element {
	const fetcher = useFetcher<TaskDataResponse>();
	const [items, setItems] = useState<Task[]>(
		data.map(
			(item) =>
				new Task({
					...item,
					dueDate: item.dueDate ? new Date(item.dueDate) : null,
					createdAt: new Date(item.createdAt),
					updatedAt: new Date(item.updatedAt),
				}),
		) ?? [],
	);
	const [isModalOpened, setModalOpenedStatus] = useState(false);

	const toggleModalStatus = () => {
		setModalOpenedStatus((prev) => !prev);
	};

	const handleStatusChange = (id: string, newStatus: Task["status"]) => {
		setItems((prev) =>
			prev.map((item) =>
				item.id === id ? new Task({ ...item, status: newStatus }) : item,
			),
		);
	};

	return (
		<SidebarProvider>
			<AppSidebar setModalOpenedStatus={setModalOpenedStatus} />
			<SidebarTrigger>
				<SidebarIcon />
			</SidebarTrigger>
			<Container>
				<EditTask
					task={new Task({ name: "無題のタスク", status: "TODO" })}
					isOpened={isModalOpened}
					onOpenChange={toggleModalStatus}
					mode="CREATE"
					fetcher={fetcher}
				/>
				<TodoList
					data={[...items].sort((a, b) => {
						if (a.dueDate && b.dueDate) {
							return a.dueDate.getTime() - b.dueDate.getTime();
						} else if (a.dueDate && !b.dueDate) {
							return -1;
						} else if (!a.dueDate && b.dueDate) {
							return 1;
						} else {
							return 0;
						}
					})}
					onStatusChange={handleStatusChange}
					fetcher={fetcher}
				/>
			</Container>
		</SidebarProvider>
	);
}

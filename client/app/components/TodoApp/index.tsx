import { type JSX, useState } from "react";

import { Plus, SidebarIcon } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "../ui/sidebar";
import { Task } from "./core/Task";
import type { TaskDataResponse } from "./core/types";
import { EditTask } from "./Modals/EditTask";
import { TodoList } from "./TodoList";

interface TodoAppProps {
	data: TaskDataResponse;
}

export function TodoApp({ ...props }: TodoAppProps): JSX.Element {
	const [items, setItems] = useState<Task[]>(() =>
		props.data.map(
			(item) =>
				new Task({
					...item,
					dueDate: item.dueDate ? new Date(item.dueDate) : null,
					createdAt: new Date(item.createdAt),
					updatedAt: new Date(item.updatedAt),
				}),
		),
	);
	const [isModalOpened, setModalOpenedStatus] = useState(false);

	const toggleModalStatus = () => {
		setModalOpenedStatus((prev) => !prev);
	};

	const handleNewTaskClicked = () => {
		setModalOpenedStatus(true);
	};

	const handleStatusChange = (id: string, newStatus: Task["status"]) => {
		setItems((prev) =>
			prev.map((item) =>
				item.id === id ? new Task({ ...item, status: newStatus }) : item,
			),
		);
	};

	return (
		<SidebarProvider className="justify-center">
			<Sidebar>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton onClick={handleNewTaskClicked} asChild>
										<div className="cursor-pointer">
											<Plus />
											<span>新規作成</span>
										</div>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
			<SidebarTrigger>
				<SidebarIcon />
			</SidebarTrigger>
			<EditTask
				task={new Task({ name: "無題のタスク", status: "TODO" })}
				isOpened={isModalOpened}
				onOpenChange={toggleModalStatus}
				mode="CREATE"
			/>
			<TodoList data={items} onStatusChange={handleStatusChange} />
		</SidebarProvider>
	);
}

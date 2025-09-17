import { type JSX, useRef, useState } from "react";

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
	const items = useRef<Task[]>([]);
	const [isModalOpened, setModalOpenedStatus] = useState(false);

	const toggleModalStatus = () => {
		if (isModalOpened) setModalOpenedStatus(false);
		else setModalOpenedStatus(true);
	};

	const handleNewTaskClicked = () => {
		setModalOpenedStatus(true);
	};

	const defaultItems = props.data.map((item) => {
		return new Task({
			...item,
			dueDate: item.dueDate ? new Date(item.dueDate) : null,
			createdAt: new Date(item.createdAt),
			updatedAt: new Date(item.updatedAt),
		});
	});
	items.current = defaultItems;

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
			<TodoList data={items.current} />
		</SidebarProvider>
	);
}

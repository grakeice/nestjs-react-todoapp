import { type JSX, useState } from "react";
import type { FetcherWithComponents } from "react-router";

import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { Task } from "./core/Task";
import type { TaskDataResponse } from "./core/types";
import { TodoListItem } from "./TodoListItem";

interface TodoListProps {
	data: Task[];
	fetcher: FetcherWithComponents<TaskDataResponse>;
	onStatusChange?: (id: string, newStatus: Task["status"]) => void;
}

export function TodoList({
	data,
	onStatusChange,
	fetcher,
}: TodoListProps): JSX.Element {
	const [_isModalOpened, setModalOpenedStatus] = useState(false);
	const [editingTaskId, setEditingTaskId] = useState("");
	const toggleModalOpenedStatus = () => {
		if (_isModalOpened) setModalOpenedStatus(false);
		else setModalOpenedStatus(true);
	};

	const isModalOpened = (id: string) => {
		if (_isModalOpened && id === editingTaskId) return true;
		else return false;
	};

	const handleEditButtonClick = (id: string) => {
		setEditingTaskId(id);
		setModalOpenedStatus(true);
	};
	const handleCheckboxChanged = async (
		id: string,
		checked: boolean | "indeterminate",
	) => {
		let newStatus: Task["status"];
		if (checked === true) {
			newStatus = "DONE";
		} else if (checked === "indeterminate") {
			newStatus = "IN_PROGRESS";
		} else {
			newStatus = "TODO";
		}
		await fetcher.submit(
			{ _action: "update", status: newStatus, id },
			{ method: "post" },
		);
		if (!onStatusChange) return;
		onStatusChange(id, newStatus);
	};

	return (
		<Table className="min-w-2/3">
			<TableHeader>
				<TableRow>
					<TableHead />
					<TableHead />
					<TableHead>タイトル</TableHead>
					<TableHead>説明</TableHead>
					<TableHead>期限</TableHead>
					<TableHead />
				</TableRow>
			</TableHeader>
			<TableBody>
				{Task.sort(
					fetcher.data?.map(
						(item) =>
							new Task({
								...item,
								dueDate: item.dueDate ? new Date(item.dueDate) : null,
								createdAt: new Date(item.createdAt),
								updatedAt: new Date(item.updatedAt),
							}),
					) ?? data,
				).map((item) => {
					return (
						<TodoListItem
							key={item.id}
							item={item}
							toggleModalOpenedStatus={toggleModalOpenedStatus}
							isModalOpened={isModalOpened}
							handleEditButtonClick={handleEditButtonClick}
							handleCheckboxChanged={handleCheckboxChanged}
							fetcher={fetcher}
						/>
					);
				})}
			</TableBody>
		</Table>
	);
}

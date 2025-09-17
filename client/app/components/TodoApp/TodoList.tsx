import { type JSX, useState } from "react";

import { Table } from "@radix-ui/themes";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import type { Task } from "./core/Task";
import { EditTask } from "./Modals/EditTask";

interface TodoListProps {
	data: Task[];
	onStatusChange?: (id: string, newStatus: Task["status"]) => void;
}

export function TodoList({ data, onStatusChange }: TodoListProps): JSX.Element {
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

	const handleCheckboxChanged = (
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
		console.log(newStatus);
		fetch(`http://127.0.0.1:3000/items/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				status: newStatus,
			}),
		});
		if (!onStatusChange) return;
		onStatusChange(id, newStatus);
	};

	return (
		<Table.Root className="min-w-2/3">
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeaderCell />
					<Table.ColumnHeaderCell>タイトル</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell>説明</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell>期限</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell />
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{data.map((item) => {
					return (
						<Table.Row key={item.id}>
							<Table.Cell>
								<Checkbox
									checked={
										item.status === "DONE"
											? true
											: item.status === "IN_PROGRESS"
												? "indeterminate"
												: false
									}
									onCheckedChange={(checked) =>
										handleCheckboxChanged(item.id, checked)
									}
								/>
							</Table.Cell>
							<Table.RowHeaderCell>{item.name}</Table.RowHeaderCell>
							<Table.Cell>{item.description}</Table.Cell>
							<Table.Cell>
								{item.dueDate?.toLocaleDateString("ja", {
									dateStyle: "long",
								})}
							</Table.Cell>
							<Table.Cell>
								<Button
									type="button"
									onClick={() => handleEditButtonClick(item.id)}
								>
									編集
								</Button>
								<EditTask
									isOpened={isModalOpened(item.id)}
									onOpenChange={toggleModalOpenedStatus}
									task={item}
									mode="EDIT"
								/>
							</Table.Cell>
						</Table.Row>
					);
				})}
			</Table.Body>
		</Table.Root>
	);
}

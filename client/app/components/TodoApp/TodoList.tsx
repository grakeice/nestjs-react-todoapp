import { type JSX, useState } from "react";

import { Table } from "@radix-ui/themes";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import type { Task } from "./core/Task";
import { EditTask } from "./Modals/EditTask";

interface TodoListProps {
	data: Task[];
}

export function TodoList({ data }: TodoListProps): JSX.Element {
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
									defaultChecked={
										item.status === "DONE"
											? true
											: item.status === "IN_PROGRESS"
												? "indeterminate"
												: false
									}
								/>
							</Table.Cell>
							<Table.RowHeaderCell>{item.name}</Table.RowHeaderCell>
							<Table.Cell>{item.description}</Table.Cell>
							<Table.Cell>
								{item.dueDate?.toLocaleDateString("ja", { dateStyle: "long" })}
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

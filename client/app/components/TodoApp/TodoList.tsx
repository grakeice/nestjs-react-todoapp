import type { JSX } from "react";

import { Checkbox, Table } from "@radix-ui/themes";

import type { TodoData } from "./core/TodoData";

interface TodoListProps {
	data: TodoData[];
}

export function TodoList({ data }: TodoListProps): JSX.Element {
	console.log(data);
	return (
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeaderCell></Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell>タイトル</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell>説明</Table.ColumnHeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{data.map((item) => {
					return (
						<Table.Row key={item.id}>
							<Table.Cell>
								<Checkbox />
							</Table.Cell>
							<Table.RowHeaderCell>{item.name}</Table.RowHeaderCell>
							<Table.Cell>{item.description}</Table.Cell>
						</Table.Row>
					);
				})}
			</Table.Body>
		</Table.Root>
	);
}

import type { JSX } from "react";
import { useId, useRef } from "react";

import {
	Button,
	Dialog,
	Flex,
	Select,
	Text,
	TextField,
} from "@radix-ui/themes";

import type { Task } from "../core/Task";

interface EditTaskProps {
	task: Task;
	isOpened: boolean;
	onOpenChange: () => void;
}

export function EditTask({ ...props }: EditTaskProps): JSX.Element {
	const task = props.task;
	const taskNameRef = useRef<HTMLHeadingElement>(null);
	const taskNameHiddenRef = useRef<HTMLInputElement>(null);
	const handleEditTaskName = () => {
		(taskNameHiddenRef.current as HTMLInputElement).value =
			taskNameRef.current?.textContent ?? "";
	};
	const descriptionId = useId();
	const statusId = useId();
	const dueDateId = useId();
	return (
		<Dialog.Root open={props.isOpened} onOpenChange={props.onOpenChange}>
			<Dialog.Content>
				<form action={`/items/${task.id}`} method="post">
					<Dialog.Title
						contentEditable
						ref={taskNameRef}
						onInput={handleEditTaskName}
					>
						{task.name}
					</Dialog.Title>
					<input type="hidden" name="name" ref={taskNameHiddenRef} />
					<Dialog.Description hidden>タスクの編集</Dialog.Description>
					<Flex direction="column" gap="3">
						<label htmlFor={descriptionId}>
							<Text as="div" size="2" mb="1" weight="bold">
								説明
							</Text>
							<TextField.Root
								id={descriptionId}
								defaultValue={task.description ?? ""}
								placeholder="タスクの説明…"
							/>
						</label>
						<label htmlFor={statusId}>
							<Text as="div" size="2" mb="1" weight="bold">
								状態
							</Text>
							<Select.Root defaultValue={task.status}>
								<Select.Trigger />
								<Select.Content id={statusId}>
									<Select.Item value={"TODO"}>未完了</Select.Item>
									<Select.Item value={"IN_PROGRESS"}>進行中</Select.Item>
									<Select.Item value={"DONE"}>完了</Select.Item>
								</Select.Content>
							</Select.Root>
						</label>
						<label htmlFor={dueDateId}>
							<Text as="div" size="2" mb="1" weight="bold">
								期限
							</Text>
						</label>
					</Flex>

					<Flex gap="3" mt="4" justify="end">
						<Dialog.Close>
							<Button variant="soft" color="gray">
								Cancel
							</Button>
						</Dialog.Close>
						<Dialog.Close>
							<Button type="submit">Save</Button>
						</Dialog.Close>
					</Flex>
				</form>
			</Dialog.Content>
		</Dialog.Root>
	);
}

import { type JSX, useState } from "react";
import type { FetcherWithComponents } from "react-router";

import clsx from "clsx";
import { EditIcon, MinusCircleIcon } from "lucide-react";
import { Flex } from "@radix-ui/themes";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { TableCell, TableRow } from "../ui/table";
import type { Task } from "./core/Task";
import type { TaskDataResponse } from "./core/types";
import { EditTask } from "./Modals/EditTask";

interface TodoListItemProps {
	item: Task;
	handleCheckboxChanged(id: string, checked: boolean | "indeterminate"): void;
	handleEditButtonClick(id: string): void;
	isModalOpened(id: string): boolean;
	toggleModalOpenedStatus(): void;
	fetcher: FetcherWithComponents<TaskDataResponse>;
}

export function TodoListItem({ ...props }: TodoListItemProps): JSX.Element {
	const {
		item,
		handleCheckboxChanged,
		handleEditButtonClick,
		isModalOpened,
		toggleModalOpenedStatus,
		fetcher,
	} = props;
	const [popoverOpen, setPopoverOpen] = useState(false);
	return (
		<TableRow className="group">
			<TableCell>
				<Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
					<PopoverTrigger asChild>
						<Button
							size={"icon"}
							variant={"ghost"}
							aria-label="削除ボタン"
							className={clsx(
								popoverOpen && "text-red-500",
								"hover:text-red-500",
								"cursor-pointer",
							)}
						>
							<MinusCircleIcon
								className={clsx(
									!popoverOpen && "invisible",
									"group-hover:visible",
								)}
							/>
						</Button>
					</PopoverTrigger>

					<PopoverContent>
						<Alert variant={"destructive"}>
							<AlertTitle>削除しますか？</AlertTitle>
							<AlertDescription>
								この操作は取り消せません
								<Flex justify={"end"} className="w-full">
									<fetcher.Form method="post">
										<input type="hidden" name="_action" value={"delete"} />
										<input type="hidden" name="id" value={item.id} />
										<Button
											variant={"ghost"}
											type="submit"
											className="cursor-pointer mx-1 hover:bg-red-500 hover:text-white"
											onClick={() => {
												setPopoverOpen(false);
											}}
										>
											削除
										</Button>
									</fetcher.Form>
									<Button
										variant={"secondary"}
										className="cursor-pointer mx-1"
										onClick={() => setPopoverOpen(false)}
									>
										キャンセル
									</Button>
								</Flex>
							</AlertDescription>
						</Alert>
					</PopoverContent>
				</Popover>
			</TableCell>
			<TableCell>
				<fetcher.Form method="post">
					<Checkbox
						aria-label="タスクのチェックボックス"
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
						className="cursor-pointer"
					/>
				</fetcher.Form>
			</TableCell>
			<TableCell>{item.name}</TableCell>
			<TableCell>{item.description}</TableCell>
			<TableCell>
				{item.dueDate?.toLocaleDateString("ja", {
					dateStyle: "long",
				})}
			</TableCell>
			<TableCell>
				<Button
					type="button"
					onClick={() => handleEditButtonClick(item.id)}
					className="cursor-pointer"
					variant={"ghost"}
				>
					<EditIcon />
					編集
				</Button>
				<EditTask
					isOpened={isModalOpened(item.id)}
					onOpenChange={toggleModalOpenedStatus}
					task={item}
					mode="EDIT"
					fetcher={fetcher}
				/>
			</TableCell>
		</TableRow>
	);
}

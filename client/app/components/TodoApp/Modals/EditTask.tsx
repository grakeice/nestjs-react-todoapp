import type { JSX } from "react";
import { useId, useState } from "react";

import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { Toaster } from "~/components/ui/sonner";
import { Textarea } from "~/components/ui/textarea";
import { Dialog, Flex } from "@radix-ui/themes";

import type { Task } from "../core/Task";
import { itemStatusSchema, type UpdateItem } from "../core/types";

interface EditTaskProps {
	task: Task;
	isOpened: boolean;
	onOpenChange: () => void;
	mode: "EDIT" | "CREATE";
}
const formSchema = z.object<UpdateItem>({
	name: z.string().nonempty(),
	description: z.string().optional(),
	dueDate: z.date().optional(),
	status: itemStatusSchema,
});

function isValidDate(date: Date | undefined) {
	if (!date) {
		return false;
	}
	return !Number.isNaN(date.getTime());
}

export function EditTask({ ...props }: EditTaskProps): JSX.Element {
	const task = props.task;
	const descriptionId = useId();
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			name: task.name,
			description: task.description ?? undefined,
			dueDate: task.dueDate ?? undefined,
			status: task.status,
		},
	});
	const [open, setOpen] = useState(false);
	const [date, setDate] = useState<Date | undefined>(task.dueDate ?? undefined);
	const [month, setMonth] = useState<Date | undefined>(date);
	const [value, setValue] = useState(date?.toLocaleDateString("ja"));
	const handleSubmit = async (data: z.infer<typeof formSchema>) => {
		switch (props.mode) {
			case "CREATE": {
				const response = await fetch(`http://127.0.0.1:3000/items`, {
					body: JSON.stringify({
						name: data.name,
						dueDate: data.dueDate,
						description: data.description,
					}),
					headers: { "Content-Type": "application/json" },
					method: "POST",
				});
				console.log(JSON.stringify(data));
				toast("Task updated", {
					description: (
						<pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
							<code className="text-white">
								{JSON.stringify(await response.json(), null, 2)}
							</code>
						</pre>
					),
				});
				break;
			}
			case "EDIT": {
				const response = await fetch(`http://127.0.0.1:3000/items/${task.id}`, {
					body: JSON.stringify({ ...data }),
					headers: { "Content-Type": "application/json" },
					method: "PUT",
				});
				console.log(JSON.stringify(data));
				toast("Task updated", {
					description: (
						<pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
							<code className="text-white">
								{JSON.stringify(await response.json(), null, 2)}
							</code>
						</pre>
					),
				});
				break;
			}
		}
		location.reload();
	};

	return (
		<Dialog.Root open={props.isOpened} onOpenChange={props.onOpenChange}>
			<Toaster />
			<Dialog.Content>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<Dialog.Title>
										<FormControl>
											<input
												defaultValue={field.value}
												type="text"
												contentEditable
											/>
										</FormControl>
									</Dialog.Title>
								</FormItem>
							)}
						></FormField>
						<Dialog.Description hidden>タスクの編集</Dialog.Description>
						<Flex direction="column" gap="3">
							<FormField
								name="description"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor={descriptionId}>説明</FormLabel>
										<FormControl>
											<Textarea
												id={descriptionId}
												placeholder="タスクの説明…"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>状態</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>状態</SelectLabel>
													<SelectItem value="TODO">未完了</SelectItem>
													<SelectItem value="IN_PROGRESS">進行中</SelectItem>
													<SelectItem value="DONE">完了</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="dueDate"
								render={({ field }) => (
									<FormItem>
										<FormLabel>期限</FormLabel>
										<div className="relative w-1/2">
											<FormControl>
												<Input
													value={value}
													placeholder="YYYY/MM/DD"
													className="bg-background pr-10"
													onChange={(e) => {
														const date = new Date(e.target.value);
														setValue(e.target.value);
														if (isValidDate(date)) {
															setDate(date);
															setMonth(date);
														}
														field.onChange(date);
													}}
													onKeyDown={(e) => {
														if (e.key === "ArrowDown") {
															e.preventDefault();
															setOpen(true);
														}
													}}
												/>
											</FormControl>
											<Popover open={open} onOpenChange={setOpen}>
												<PopoverTrigger asChild>
													<Button
														variant="ghost"
														className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
													>
														<CalendarIcon className="size-3.5" />
														<span className="sr-only">Select date</span>
													</Button>
												</PopoverTrigger>
												<PopoverContent
													className="w-auto overflow-hidden p-0"
													align="end"
													alignOffset={-8}
													sideOffset={10}
												>
													<Calendar
														mode="single"
														selected={date}
														captionLayout="dropdown"
														month={month}
														onMonthChange={setMonth}
														onSelect={(selectedDate) => {
															setDate(selectedDate);
															setValue(selectedDate?.toLocaleDateString("ja"));
															setOpen(false);
															field.onChange(selectedDate);
														}}
													/>
												</PopoverContent>
											</Popover>
										</div>
									</FormItem>
								)}
							/>
						</Flex>

						<Flex gap="3" mt="4" justify="end">
							<Dialog.Close>
								<Button variant={"secondary"} color="gray">
									キャンセル
								</Button>
							</Dialog.Close>
							<Dialog.Close>
								<Button type="submit">保存</Button>
							</Dialog.Close>
						</Flex>
					</form>
				</Form>
			</Dialog.Content>
		</Dialog.Root>
	);
}

import type { ZodDate, ZodOptional, ZodString, z } from "zod";
import zod from "zod";

export const itemStatusSchema = zod.enum(["TODO", "IN_PROGRESS", "DONE"]);
export type ItemStatus = z.infer<typeof itemStatusSchema>;
export type TaskDataResponse = {
	id: string;
	name: string;
	description: string | null;
	status: ItemStatus;
	dueDate: string | null;
	createdAt: string;
	updatedAt: string;
}[];

export type UpdateItem = {
	name: ZodString;
	description: ZodOptional<ZodString>;
	dueDate: ZodOptional<ZodDate>;
	status: typeof itemStatusSchema;
};

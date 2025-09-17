import type { ZodDate, ZodOptional, ZodString, ZodUUID, z } from "zod";
import zod from "zod";

export const itemStatusSchema = zod.enum(["TODO", "IN_PROGRESS", "DONE"]);
export type ItemStatus = z.infer<typeof itemStatusSchema>;
export const actionStatusSchema = zod.enum(["create", "edit"]);
export type ActionStatus = z.infer<typeof actionStatusSchema>;
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
	_action: typeof actionStatusSchema;
	id: ZodUUID;
	name: ZodString;
	description: ZodOptional<ZodString>;
	dueDate: ZodOptional<ZodDate>;
	status: typeof itemStatusSchema;
};

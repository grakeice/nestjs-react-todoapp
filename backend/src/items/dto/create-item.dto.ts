import {
	IsDate,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
} from "class-validator";
import { ItemStatus } from "generated/prisma";

export class CreateItemDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsOptional()
	@IsDate()
	dueDate?: Date;

	@IsOptional()
	@IsString()
	description?: string;

	@IsEnum(ItemStatus)
	status?: ItemStatus;
}

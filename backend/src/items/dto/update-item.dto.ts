import { IsEnum, IsOptional, IsString } from "class-validator";
import { ItemStatus } from "generated/prisma";

export class UpdateItemDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsEnum(ItemStatus)
	status?: ItemStatus;
}

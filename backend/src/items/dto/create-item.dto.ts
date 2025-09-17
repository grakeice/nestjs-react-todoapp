import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

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
}

import {
	Controller,
	Post,
	Body,
	Get,
	Put,
	Param,
	ParseUUIDPipe,
	Delete,
} from "@nestjs/common";
import { ItemsService } from "./items.service";
import type { CreateItemDto } from "./dto/create-item.dto";
import type { UpdateItemDto } from "./dto/update-item.dto";

@Controller("items")
export class ItemsController {
	constructor(private readonly itemsService: ItemsService) {}

	@Get()
	async findAll() {
		return await this.itemsService.findAll();
	}

	@Post()
	async create(@Body() createItemDto: CreateItemDto) {
		return await this.itemsService.create(createItemDto);
	}

	@Put(":id")
	async update(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() updateItemDto: UpdateItemDto,
	) {
		return await this.itemsService.update(id, updateItemDto);
	}

	@Delete(":id")
	async delete(@Param("id", ParseUUIDPipe) id: string) {
		return await this.itemsService.delete(id);
	}
}

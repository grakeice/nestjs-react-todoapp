import { Controller, Post, Body } from "@nestjs/common";
import { ItemsService } from "./items.service";
import type { CreateItemDto } from "./dto/create-item.dto";

@Controller("items")
export class ItemsController {
	constructor(private readonly itemsService: ItemsService) {}
	@Post()
	async create(@Body() createItemDto: CreateItemDto) {
		return await this.itemsService.create(createItemDto);
	}
}

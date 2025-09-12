import { Injectable } from "@nestjs/common";
import type { Item } from "generated/prisma";
import { PrismaService } from "@/prisma/prisma.service";
import type { CreateItemDto } from "./dto/create-item.dto";

@Injectable()
export class ItemsService {
	private items: Item[] = [];

	constructor(private readonly prismaService: PrismaService) {}

	async create(createItemDto: CreateItemDto) {
		const { name, description } = createItemDto;
		return await this.prismaService.item.create({
			data: {
				name,
				description,
				status: "TODO",
			},
		});
	}
}

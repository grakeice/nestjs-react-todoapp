import { Injectable } from "@nestjs/common";
import type { Item } from "generated/prisma";
import { PrismaService } from "@/prisma/prisma.service";
import type { CreateItemDto } from "./dto/create-item.dto";
import type { UpdateItemDto } from "./dto/update-item.dto";

@Injectable()
export class ItemsService {
	private items: Item[] = [];

	constructor(private readonly prismaService: PrismaService) {}

	async findAll() {
		return await this.prismaService.item.findMany();
	}

	async create(createItemDto: CreateItemDto) {
		const { name, description, dueDate } = createItemDto;
		return await this.prismaService.item.create({
			data: {
				name,
				description,
				dueDate,
				status: "TODO",
			},
		});
	}

	async update(id: string, updateItemDto: UpdateItemDto) {
		const { name, description, dueDate, status } = updateItemDto;
		return await this.prismaService.item.update({
			data: {
				name,
				description,
				dueDate,
				status,
			},
			where: { id },
		});
	}

	async delete(id: string) {
		await this.prismaService.item.delete({ where: { id } });
	}
}

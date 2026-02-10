import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';


@Injectable()
export class ItensService {
    constructor(
        @InjectRepository(Item)
        private readonly repo: Repository<Item>,
    ) {}


    create(dto: CreateItemDto) {
        const item = this.repo.create(dto);
        return this.repo.save(item);
    }


    findAll() {
        return this.repo.find();
    }


    findOne(id: number) {
        return this.repo.findOneBy({ id });
    }


    async update(id: number, dto: UpdateItemDto) {
        await this.repo.update(id, dto);
        return this.findOne(id);
    }


    remove(id: number) {
        return this.repo.delete(id);
    }
}
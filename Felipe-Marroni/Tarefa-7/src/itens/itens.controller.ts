import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItensService } from './itens.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';


@Controller('itens')
export class ItensController {
  constructor(private readonly itensService: ItensService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itensService.create(createItemDto);
  }

  @Get()
  findAll() {
    return this.itensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itensService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itensService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itensService.remove(+id);
  }
}
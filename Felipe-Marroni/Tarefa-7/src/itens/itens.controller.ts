import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItensService } from './itens.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';


@Controller('itens')
export class ItensController {
  constructor(private readonly itensService: ItensService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    try {
      return await this.itensService.create(createItemDto);
    } catch (error){
      console.log('Não foi possível criar este item, tente novamente');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.itensService.findAll();
    } catch(error){
      console.log('Não foi possível encontrar os itens');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try{
      return await this.itensService.findOne(+id);
    } catch(error){
      console.log('Não foi possível encontrar o item');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    try {
      return await this.itensService.update(+id, updateItemDto);
    } catch(error){
      console.log('Não foi possível atualizar o item');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.itensService.remove(+id);
    } catch(error){
      console.log('Não foi possível deletar o item');
    }
  }
}
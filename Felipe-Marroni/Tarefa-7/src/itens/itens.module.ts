import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItensService } from './itens.service';
import { ItensController } from './itens.controller';
import { Item } from './entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [ItensController],
  providers: [ItensService],
})
export class ItensModule {}
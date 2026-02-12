import { Module } from '@nestjs/common';
import { ItensService } from './itens.service';
import { ItensController } from './itens.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ItensController],
  providers: [ItensService],
})
export class ItensModule {}
import { Module } from '@nestjs/common';
import { AtividadesService } from './atividades.service';
import { AtividadesController } from './atividades.controller';
import { Atividade } from './entities/atividade.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Atividade])],
  controllers: [AtividadesController],
  providers: [AtividadesService],
})
export class AtividadesModule {}

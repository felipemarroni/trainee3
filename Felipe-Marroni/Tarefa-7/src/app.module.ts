import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItensModule } from './itens/itens.module';

@Module({
  imports: [ItensModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
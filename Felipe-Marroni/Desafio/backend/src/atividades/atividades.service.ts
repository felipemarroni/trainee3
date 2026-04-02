import { CreateAtividadeDto } from './dto/create-atividade.dto';
import { UpdateAtividadeDto } from './dto/update-atividade.dto';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Atividade } from './entities/atividade.entity';

@Injectable()
export class AtividadesService {
  constructor(
    @InjectRepository(Atividade)
    private readonly atividadesRepository: Repository<Atividade>,
  ) {}

  async create(createAtividadeDto: CreateAtividadeDto) {
    const novaAtividade = this.atividadesRepository.create(createAtividadeDto);
    await this.atividadesRepository.save(novaAtividade);
    return novaAtividade;
  }

  async findAll(): Promise<Atividade[]> {
    return this.atividadesRepository.find();
  }

  async findOne(id: number) {
    const atividade = await this.atividadesRepository.findOneBy({ id });
    if (!atividade) {
      throw new NotFoundException(`Atividade: ${id} não encontrada`);
    }

    return atividade;
  }

  async update(id: number, updateAtividadeDto: UpdateAtividadeDto) {
    const atividade = await this.atividadesRepository.preload({
      ...updateAtividadeDto,
      id,
    });
    if (!atividade) {
      throw new NotFoundException(`Atividade: ${id} não encontrada`);
    }

    return this.atividadesRepository.save(atividade);
  }

  async remove(id: number) {
    const atividade = await this.atividadesRepository.findOneBy({ id });
    if (!atividade) {
      throw new NotFoundException(`Atividade: ${id} não encontrada`);
    }

    return this.atividadesRepository.remove(atividade);
  }
}

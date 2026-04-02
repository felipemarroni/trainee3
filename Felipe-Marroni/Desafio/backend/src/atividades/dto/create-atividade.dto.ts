import {
  IsString,
  Min,
  IsNotEmpty,
  IsInt,
  MaxLength,
  IsPositive,
  IsEnum,
} from 'class-validator';
import { IntensidadeAtividade } from '../entities/atividade.entity';

export class CreateAtividadeDto {
  @IsNotEmpty({ message: 'Preencha o nome da Atividade' })
  @IsString({ message: 'Insira um texto válido' })
  @MaxLength(50, { message: 'Nome muito longo' })
  atividade!: string;

  @IsString({ message: 'O preço deve ser um número' })
  descricao!: string;

  @IsNotEmpty({ message: 'Preencha a intensidade' })
  @IsEnum(IntensidadeAtividade, { message: 'Escolha uma intesidade válida' })
  intensidade!: IntensidadeAtividade;

  @IsInt({ message: 'Insira um número válido' })
  @IsPositive({ message: 'Quantidade de tempo deve ser positiva' })
  @Min(5, { message: 'Atividade deve ter no mínimo 5 minutos' })
  @IsNotEmpty({ message: 'Preencha a quantidade de tempo' })
  qtd_tempo!: number;
}

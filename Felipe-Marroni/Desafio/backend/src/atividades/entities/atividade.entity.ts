import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum IntensidadeAtividade {
  BAIXA = 'Baixa',
  MEDIA = 'Média',
  ALTA = 'Alta',
  MUITO_ALTA = 'Muito Alta',
}

@Entity()
export class Atividade {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  atividade!: string;

  @Column()
  descricao?: string;

  @Column()
  intensidade!: string;

  @Column()
  qtd_tempo!: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}

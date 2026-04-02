export enum IntensidadeAtividade {
  BAIXA = 'Baixa',
  MEDIA = 'Média',
  ALTA = 'Alta',
  MUITO_ALTA = 'Muito Alta',
}

export interface Atividade {
    id?: number;
    atividade: string;
    descricao?: string;
    intensidade: IntensidadeAtividade;
    qtd_tempo: number
    createdAt?: string;
    updatedAt?: string;
}

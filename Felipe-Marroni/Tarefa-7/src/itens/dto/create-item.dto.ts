import { IsString, IsNumber, Min, IsNotEmpty } from 'class-validator';

export class CreateItemDto {
  @IsString() 
  @IsNotEmpty() 
  nome: string;

  @IsNumber()
  @Min(0) 
  preco: number;

  @IsNumber()
  id: number;
}
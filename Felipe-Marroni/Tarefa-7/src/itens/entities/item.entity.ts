import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    nome: string;


    @Column()
    preco: number;
}
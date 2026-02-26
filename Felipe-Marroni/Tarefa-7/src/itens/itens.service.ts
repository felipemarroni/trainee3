import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Database } from 'sqlite3';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';


@Injectable()
export class ItensService {
    constructor(
        @Inject('DATABASE_CONNECTION')
        private db: Database,
    ) {}


    async create(dto: CreateItemDto): Promise<any> {
        return new Promise((resolve, reject) => {
            const { nome, preco } = dto;

            this.db.run(
                `INSERT INTO itens (nome, preco) VALUES (?, ?, ?)`,
                [nome, preco],
                function (err) {
                    if (err) return reject(err);
                    resolve({
                        id: this.lastID,
                        ...dto,
                    });
                },
            );
        });
    }

    async findAll(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM itens`, [], (err, linhas) => {
                if (err) return reject(err);
                resolve(linhas);
            });
        });
    }


    async findOne(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.get(
                `SELECT * FROM itens WHERE id = ?`,
                [id],
                (err, linha) => {
                    if (err) return reject(err);
                    if (!linha) throw new NotFoundException('item not found');
                    resolve(linha);
                },
            );
        });
    }

    async update(id: number, dto: UpdateItemDto) {
        const item = await this.findOne(id);

        const updated = {
            nome: dto.nome ?? item.nome,
            preco: dto.preco ?? item.preco,
        };

        return new Promise((resolve, reject) => {
            this.db.run(
                `UPDATE itens SET nome = ?, preco = ? WHERE id = ?`,
                [updated.nome, updated.preco, id],
                function (err) {
                    if (err) return reject(err);
                    resolve({ id, ...updated });
                },
            );
        });
    }


    async remove(id: number) {
        await this.findOne(id);

        return new Promise((resolve, reject) => {
            this.db.run(
                `DELETE FROM itens WHERE id = ?`,
                [id],
                function (err) {
                    if (err) return reject(err);
                    resolve({ deleted: true });
                },
            );
        });
    }
}
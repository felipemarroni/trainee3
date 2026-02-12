import * as sqlite3 from 'sqlite3';
import { Database } from 'sqlite3';

export const databaseProvider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: async (): Promise<Database> => {
    const db = new sqlite3.Database('./db.sqlite');

    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS itens (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          preco INTEGER NOT NULL,
        )
      `);
    });

    return db;
  },
};
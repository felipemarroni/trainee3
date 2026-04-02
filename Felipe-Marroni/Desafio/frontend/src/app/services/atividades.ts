import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atividade } from '../model/atividade.model';

@Injectable({
  providedIn: 'root',
})
export class AtividadeService {
  private readonly apiUrl = 'http://localhost:3000/atividades';

  constructor(private readonly http: HttpClient) {}

  buscarTodos(): Observable<Atividade[]> {
    return this.http.get<Atividade[]>(this.apiUrl);
  }

  buscarUm(id: number): Observable<Atividade> {
    return this.http.get<Atividade>(`${this.apiUrl}/${id}`);
  }

  criarAtividade(atividade: Omit<Atividade, 'id' | 'createdAt' | 'updatedAt'>): Observable<Atividade> {
    return this.http.post<Atividade>(this.apiUrl, atividade);
  }

  editarAtividade(id: number, atividade: Partial<Atividade>): Observable<Atividade> {
    return this.http.patch<Atividade>(`${this.apiUrl}/${id}`, atividade);
  }

  excluirAtividade(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
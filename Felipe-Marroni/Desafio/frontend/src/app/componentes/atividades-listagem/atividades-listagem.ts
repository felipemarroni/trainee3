import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { AtividadeService } from '../../services/atividades';
import { Atividade } from '../../model/atividade.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atividades-listagem',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './atividades-listagem.html',
  styleUrls: ['./atividades-listagem.scss'],
})
export class AtividadeListagemComponente implements OnInit {
  atividades = signal<Atividade[]>([]);

  private atividadeService = inject(AtividadeService);
  private router = inject(Router);

  ngOnInit(): void {
    this.carregarAtividades();
  }

  carregarAtividades(): void {
    this.atividadeService.buscarTodos().subscribe({
      next: (dado) => {
        this.atividades.set(dado);
      },
      error: (erro) => {
        console.error('Erro ao carregar a lista de atividades:', erro);
      },
    });
  }

  onClick(): void {
    this.router.navigate(['nova'])
  }

  deletarAtividade(id: number): void {
    const confirmed = confirm('Deseja mesmo excluir esta atividade?');
    if (!confirmed) return;

    this.atividadeService.excluirAtividade(id).subscribe({
      next: () => {
        this.carregarAtividades();
      },
      error: (erro) => {
        console.error('Erro ao excluir atividade:', erro);
      },
    });
  }
}

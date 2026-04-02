import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Atividade, IntensidadeAtividade } from '../../model/atividade.model';
import { AtividadeService } from '../../services/atividades';

@Component({
  selector: 'app-atividades-criacao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './atividades-criacao.html',
  styleUrls: ['./atividades-criacao.scss'],
})
export class AtividadeCriacaoComponente {
  
  private fb = inject(FormBuilder)
  private atividadeService = inject(AtividadeService)
  private router = inject(Router);

  intensidades = Object.values(IntensidadeAtividade);

  formulario = this.fb.group({
    atividade: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    descricao: ['', [Validators.required, Validators.maxLength(300)]],
    intensidade: ['', Validators.required],
    qtd_tempo: [0, [Validators.required, Validators.min(5), Validators.max(500)]],
  });


  criar() {

    const dadosAtividade = this.formulario.value

    this.atividadeService.criarAtividade(dadosAtividade as Atividade).subscribe({
      next: () => {
        this.router.navigate(['/']);

      },
      error: (erro) => {
        console.error('Erro ao criar atividade:', erro);
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }
}

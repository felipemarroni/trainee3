import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Atividade, IntensidadeAtividade } from '../../model/atividade.model';
import { AtividadeService } from '../../services/atividades';

@Component({
  selector: 'app-atividades-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './atividades-edicao.html',
  styleUrls: ['./atividades-edicao.scss'],
})
export class AtividadeEdicaoComponente implements OnInit {
  formulario!: FormGroup;
  atividadeId!: number;

  intensidades = Object.values(IntensidadeAtividade);

  constructor(
    private readonly fb: FormBuilder,
    private readonly atividadeService: AtividadeService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  inicializarFormulario(): void {
    this.formulario = this.fb.group({
      atividade: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      descricao: ['', Validators.maxLength(300)],
      intensidade: ['', Validators.required],
      qtd_tempo: [0, [Validators.required, Validators.min(5), Validators.max(500)]],
    });
  }

  carregarAtividade(id: number): void {
    if (id) {
      this.atividadeService.buscarUm(id).subscribe({
        next: (atividade) => {
          this.formulario.patchValue(atividade);
        },
        error: (erro) => {
          console.error('Erro ao carregar atividade:', erro);
        },
      });
    }
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    const idParam = this.route.snapshot.paramMap.get('id');
    this.atividadeId = Number(idParam);
    this.carregarAtividade(this.atividadeId);
  }

  atualizarAtividade(id: number, dados: Atividade): void {
    this.atividadeService.editarAtividade(id, dados).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (erro) => {
        console.error('Erro ao atualizar atividade:', erro);
      },
    });
  }

  editar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const dadosFormulario: Atividade = {
      ...this.formulario.value,
    };

    this.atualizarAtividade(this.atividadeId, dadosFormulario);
  }

  cancelar(): void {
    this.router.navigate(['/atividades']);
  }
}
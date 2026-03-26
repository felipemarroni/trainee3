import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormRecord,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

type RedeSocialControl = FormControl<string>;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  titulo = 'Cadastro com Reactive Forms + FormArray + FormRecord';

  // campos auxiliares para adicionar rede social dinamicamente
  novaRedeNome = '';
  novaRedeUrl = '';

  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      idade: [null, [Validators.required, Validators.min(18), Validators.max(100)]],
      cargo: ['', [Validators.required]],
      salario: [null, [Validators.required, Validators.min(1000)]],
      ativo: [true],

      telefones: this.fb.array([
        this.criarTelefoneControl()
      ]),

      redesSociais: new FormRecord<RedeSocialControl>({
        linkedin: new FormControl('https://linkedin.com/in/exemplo', {
          nonNullable: true,
          validators: [Validators.required]
        }),
        github: new FormControl('https://github.com/exemplo', {
          nonNullable: true,
          validators: [Validators.required]
        })
      })
    });
  }

  get telefones(): FormArray {
    return this.cadastroForm.get('telefones') as FormArray;
  }

  get redesSociais(): FormRecord<RedeSocialControl> {
    return this.cadastroForm.get('redesSociais') as FormRecord<RedeSocialControl>;
  }

  get nomesDasRedes(): string[] {
    return Object.keys(this.redesSociais.controls);
  }

  criarTelefoneControl(): FormControl {
    return this.fb.control('', [
      Validators.required,
      Validators.pattern(/^\d{10,11}$/)
    ]);
  }

  adicionarTelefone(): void {
    this.telefones.push(this.criarTelefoneControl());
  }

  removerTelefone(index: number): void {
    if (this.telefones.length > 1) {
      this.telefones.removeAt(index);
    }
  }

  adicionarRedeSocial(): void {
    const chave = this.novaRedeNome.trim().toLowerCase();
    const valor = this.novaRedeUrl.trim();

    if (!chave || !valor) {
      alert('Informe o nome da rede e a URL.');
      return;
    }

    if (this.redesSociais.contains(chave)) {
      alert('Essa rede social já existe.');
      return;
    }

    this.redesSociais.addControl(
      chave,
      new FormControl(valor, {
        nonNullable: true,
        validators: [Validators.required]
      })
    );

    this.novaRedeNome = '';
    this.novaRedeUrl = '';
  }

  removerRedeSocial(nomeRede: string): void {
    this.redesSociais.removeControl(nomeRede);
  }

  onSubmit(): void {
    if (this.cadastroForm.invalid) {
      this.cadastroForm.markAllAsTouched();
      alert('Verifique os campos antes de enviar.');
      return;
    }

    console.log('Dados enviados:', this.cadastroForm.value);
    alert('Cadastro enviado com sucesso!');

    // reset mantendo 1 telefone e recriando redes iniciais
    this.resetarFormulario();
  }

  resetarFormulario(): void {
    // limpa FormArray
    while (this.telefones.length !== 0) {
      this.telefones.removeAt(0);
    }
    this.telefones.push(this.criarTelefoneControl());

    // limpa FormRecord
    this.nomesDasRedes.forEach((nome) => this.redesSociais.removeControl(nome));

    // recria padrões
    this.redesSociais.addControl(
      'linkedin',
      new FormControl('https://linkedin.com/in/exemplo', {
        nonNullable: true,
        validators: [Validators.required]
      })
    );

    this.redesSociais.addControl(
      'github',
      new FormControl('https://github.com/exemplo', {
        nonNullable: true,
        validators: [Validators.required]
      })
    );

    this.cadastroForm.patchValue({
      nome: '',
      email: '',
      idade: null,
      cargo: '',
      salario: null,
      ativo: true
    });

    this.cadastroForm.markAsPristine();
    this.cadastroForm.markAsUntouched();
  }

  campoInvalido(nomeCampo: string): boolean {
    const campo = this.cadastroForm.get(nomeCampo);
    return !!campo && campo.invalid && campo.touched;
  }

  telefoneInvalido(index: number): boolean {
    const control = this.telefones.at(index);
    return control.invalid && control.touched;
  }

  redeInvalida(nomeRede: string): boolean {
    const control = this.redesSociais.get(nomeRede);
    return !!control && control.invalid && control.touched;
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  estados: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES',
    'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR',
    'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
    'SP', 'SE', 'TO'
  ];

  usuario = {
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    idade: null as number | null,
    telefone: '',
    cpf: '',
    endereco: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    genero: '',
    profissao: '',
    observacoes: '',
    newsletter: false,
    termos: false
  };

  senhaConfere(): boolean {
    return this.usuario.senha === this.usuario.confirmarSenha;
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.senhaConfere()) {
      console.log('Formulário enviado com sucesso!');
      console.log(this.usuario);

      alert('Cadastro realizado com sucesso!');

      form.resetForm({
        newsletter: false,
        termos: false
      });
    } else {
      alert('Verifique os campos antes de enviar.');
    }
  }

  limparFormulario(form: NgForm) {
    form.resetForm({
      newsletter: false,
      termos: false
    });
  }
}
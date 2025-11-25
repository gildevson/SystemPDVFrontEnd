import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-novo-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './CadastrarnovoUsuario.component.html',
  styleUrls: ['./CadastrarnovoUsuario.component.css']
})
export class CadastrarnovoUsuarioComponent {

  @Output() salvou = new EventEmitter<void>();
  @Output() fechar = new EventEmitter<void>();

  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';   // NOVA VARIÁVEL

  carregando = false;
  erro = '';
  sucesso = false;

  constructor(private http: HttpClient) {}

  salvar() {
    this.erro = '';
    this.sucesso = false;
    this.carregando = true;

    // 🔥 VALIDAÇÃO DAS SENHAS
    if (this.senha !== this.confirmarSenha) {
      this.carregando = false;
      this.erro = 'As senhas não coincidem.';
      return;
    }

    const novoUsuario = {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    };

    this.http.post('https://localhost:7110/api/Auth/registrar', novoUsuario)
      .subscribe({
        next: () => {
          this.carregando = false;
          this.sucesso = true;

          setTimeout(() => {
            this.salvou.emit();
          }, 600);
        },
        error: () => {
          this.carregando = false;
          this.erro = 'Erro ao criar usuário. Verifique os dados.';
        }
      });
  }
}

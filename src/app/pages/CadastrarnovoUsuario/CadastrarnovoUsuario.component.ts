import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './CadastrarnovoUsuario.component.html',
  styleUrls: ['./CadastrarnovoUsuario.component.css']
})
export class CadastrarUsuarioComponent {

  @Output() salvou = new EventEmitter<void>();
  @Output() fechar = new EventEmitter<void>();

  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  tipoUsuario: number | null = null;

  carregando = false;
  erro = '';
  sucesso = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  cancelar(): void {
    this.router.navigate(['/menu/usuarios']);
  }

  salvar(): void {
    this.erro = '';
    this.sucesso = false;

    // 🔎 Validações
    if (!this.nome || !this.email || !this.senha || !this.confirmarSenha) {
      this.erro = 'Preencha todos os campos.';
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.erro = 'As senhas não coincidem.';
      return;
    }

    if (this.senha.length < 6) {
      this.erro = 'A senha deve ter no mínimo 6 caracteres.';
      return;
    }

    if (!this.tipoUsuario) {
      this.erro = 'Selecione o tipo de usuário.';
      return;
    }

    this.carregando = true;

    const novoUsuario = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      tipoUsuario: this.tipoUsuario
    };

    this.http.post('https://localhost:7110/api/Auth/registrar', novoUsuario)
      .subscribe({
        next: () => {
          this.carregando = false;
          this.sucesso = true;

          // Limpar campos
          this.nome = '';
          this.email = '';
          this.senha = '';
          this.confirmarSenha = '';
          this.tipoUsuario = null;

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

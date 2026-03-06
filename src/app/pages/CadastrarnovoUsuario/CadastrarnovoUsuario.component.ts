import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

interface CadastroUsuarioRequest {
  nome: string;
  email: string;
  senha: string;
  permissaoId: number;
}

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

  // 🔹 Campos do formulário
  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  permissaoId: number | null = null;

  // 🔹 Estados
  carregando = false;
  erro = '';
  sucesso = false;

  // 🔹 Configurações
  private readonly API_URL = 'https://localhost:7041/api/Auth/registrar';
  private readonly SENHA_MIN_LENGTH = 6;

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
    if (!this.validarCampos()) {
      return;
    }

    this.carregando = true;

    const novoUsuario: CadastroUsuarioRequest = {
      nome: this.nome.trim(),
      email: this.email.trim().toLowerCase(),
      senha: this.senha,
      permissaoId: this.permissaoId!
    };

    this.http.post(this.API_URL, novoUsuario)
      .subscribe({
        next: () => {
          this.carregando = false;
          this.sucesso = true;
          this.limparFormulario();

          setTimeout(() => {
            this.salvou.emit();
            this.router.navigate(['/menu/usuarios']);
          }, 1000);
        },
        error: (error: HttpErrorResponse) => {
          this.carregando = false;
          this.erro = this.tratarErro(error);
        }
      });
  }

  private validarCampos(): boolean {
    // Validar campos vazios
    if (!this.nome?.trim()) {
      this.erro = 'O nome é obrigatório.';
      return false;
    }

    if (!this.email?.trim()) {
      this.erro = 'O e-mail é obrigatório.';
      return false;
    }

    // Validar formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.erro = 'Digite um e-mail válido.';
      return false;
    }

    // Validar tipo de usuário
    if (!this.permissaoId) {
      this.erro = 'Selecione o tipo de usuário.';
      return false;
    }

    // Validar senha
    if (!this.senha) {
      this.erro = 'A senha é obrigatória.';
      return false;
    }

    if (this.senha.length < this.SENHA_MIN_LENGTH) {
      this.erro = `A senha deve ter no mínimo ${this.SENHA_MIN_LENGTH} caracteres.`;
      return false;
    }

    // Validar confirmação de senha
    if (!this.confirmarSenha) {
      this.erro = 'Confirme a senha.';
      return false;
    }

    if (this.senha !== this.confirmarSenha) {
      this.erro = 'As senhas não coincidem.';
      return false;
    }

    return true;
  }

  private tratarErro(error: HttpErrorResponse): string {
    if (error.status === 400) {
      return error.error?.message || 'Dados inválidos. Verifique as informações.';
    }

    if (error.status === 409) {
      return 'Este e-mail já está cadastrado.';
    }

    if (error.status === 0) {
      return 'Erro de conexão. Verifique sua internet.';
    }

    return 'Erro ao criar usuário. Tente novamente.';
  }

  private limparFormulario(): void {
    this.nome = '';
    this.email = '';
    this.senha = '';
    this.confirmarSenha = '';
    this.permissaoId = null;
  }

  // 🔹 Método auxiliar para obter nome do tipo
  getTipoUsuarioNome(): string {
    if (this.permissaoId === 1) return 'Administrador';
    if (this.permissaoId === 2) return 'Usuário';
    return '';
  }
}

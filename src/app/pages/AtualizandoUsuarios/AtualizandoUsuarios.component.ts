import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-atualizar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './AtualizandoUsuarios.component.html',
  styleUrls: ['./AtualizandoUsuarios.component.css']
})
export class AtualizarUsuarioComponent implements OnInit {

  id!: string;
  nome = '';
  email = '';
  senha = '';
  permissaoId: number | null = null; // 🆕 Permissão

  carregando = false;
  carregandoDados = false;
  erro = '';
  sucesso = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.buscarUsuario();
  }

  buscarUsuario(): void {
    this.carregandoDados = true;
    this.erro = '';

    this.http.get<any>(`https://localhost:7110/api/users?page=1&pageSize=1000`)
      .subscribe({
        next: (res) => {
          const usuario = res.data.find((u: any) => u.id === this.id);

          if (usuario) {
            this.nome = usuario.nome;
            this.email = usuario.email;

            // 🆕 Mapear permissão atual
            if (usuario.permissoes && usuario.permissoes.length > 0) {
              const permissao = usuario.permissoes[0].toUpperCase();
              this.permissaoId = permissao === 'ADMIN' ? 1 : 2;
            } else {
              this.permissaoId = 2; // Padrão: usuário comum
            }
          } else {
            this.erro = 'Usuário não encontrado.';
          }

          this.carregandoDados = false;
        },
        error: () => {
          this.erro = 'Erro ao carregar usuário.';
          this.carregandoDados = false;
        }
      });
  }

  atualizar(): void {
    this.erro = '';
    this.sucesso = false;

    // Validações
    if (!this.nome?.trim()) {
      this.erro = 'O nome é obrigatório.';
      return;
    }

    if (!this.email?.trim()) {
      this.erro = 'O email é obrigatório.';
      return;
    }

    if (!this.permissaoId) {
      this.erro = 'Selecione uma permissão.';
      return;
    }

    // Validar senha se preenchida
    if (this.senha && this.senha.length < 6) {
      this.erro = 'A senha deve ter no mínimo 6 caracteres.';
      return;
    }

    this.carregando = true;

    const payload: any = {
      id: this.id,
      nome: this.nome.trim(),
      email: this.email.trim(),
      permissaoId: this.permissaoId // 🆕 Envia permissão
    };

    // Adicionar senha apenas se foi preenchida
    if (this.senha && this.senha.trim()) {
      payload.senha = this.senha;
    }

    this.http.put(`https://localhost:7110/api/auth`, payload)
      .subscribe({
        next: () => {
          this.carregando = false;
          this.sucesso = true;
          setTimeout(() => this.router.navigate(['/menu/usuarios']), 1500);
        },
        error: (err) => {
          console.error('Erro:', err);
          this.carregando = false;
          this.erro = err.error?.mensagem || 'Erro ao atualizar usuário.';
        }
      });
  }

  cancelar(): void {
    this.router.navigate(['/menu/usuarios']);
  }
}

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

    // ✅ CORRIGIDO: Buscar na lista primeiro
    this.http.get<any>(`https://localhost:7110/api/users?page=1&pageSize=1000`)
      .subscribe({
        next: (res) => {
          const usuario = res.data.find((u: any) => u.id === this.id);

          if (usuario) {
            this.nome = usuario.nome;
            this.email = usuario.email;
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
    this.carregando = true;

    const payload: any = {
      id: this.id,        // ✅ IMPORTANTE: Enviar o ID
      nome: this.nome,
      email: this.email
    };

    if (this.senha && this.senha.trim().length >= 4) {
      payload.senha = this.senha;
    }

    // ✅ CORRIGIDO: Endpoint correto
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

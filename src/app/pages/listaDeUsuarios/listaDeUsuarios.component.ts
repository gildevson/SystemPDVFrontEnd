import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../shared/loading.service';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  permissoes: string[];  // ✅ ARRAY de strings
  dataCriacao: string;
}

@Component({
  selector: 'app-lista-de-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './ListaDeUsuarios.component.html',
  styleUrls: ['./ListaDeUsuarios.component.css']
})
export class ListaDeUsuariosComponent implements OnInit {

  // 🔹 Dados
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  termoPesquisa = '';
  erro = false;

  // 🔹 Paginação
  page = 1;
  pageSize = 10;
  total = 0;
  totalPages = 1;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.buscarUsuarios();
  }

  buscarUsuarios(page: number = 1) {
    this.loadingService.show();
    this.erro = false;

    const startTime = Date.now();

    this.http
      .get<any>(`https://localhost:7110/api/users?page=${page}&pageSize=${this.pageSize}`)
      .subscribe({
        next: (res) => {
          this.usuarios = res.data;
          this.usuariosFiltrados = res.data;
          this.page = res.page;
          this.pageSize = res.pageSize;
          this.total = res.total;
          this.totalPages = Math.ceil(this.total / this.pageSize);

          this.finalizarLoading(startTime);
        },
        error: () => {
          this.erro = true;
          this.finalizarLoading(startTime);
        }
      });
  }

  private finalizarLoading(startTime: number) {
    const elapsedTime = Date.now() - startTime;
    const minLoadingTime = 500;
    const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

    setTimeout(() => this.loadingService.hide(), remainingTime);
  }

  pesquisar() {
    const termo = this.termoPesquisa.toLowerCase().trim();

    if (!termo) {
      this.usuariosFiltrados = this.usuarios;
      return;
    }

    this.usuariosFiltrados = this.usuarios.filter(u =>
      u.nome.toLowerCase().includes(termo) ||
      u.email.toLowerCase().includes(termo) ||
      u.permissoes.some(p => p.toLowerCase().includes(termo)) // ✅ Busca no array
    );
  }

  limparPesquisa() {
    this.termoPesquisa = '';
    this.usuariosFiltrados = this.usuarios;
  }

  // ✅ Método para formatar permissões
  formatarPermissoes(permissoes: string[]): string {
    if (!permissoes || permissoes.length === 0) {
      return 'Sem permissões';
    }
    return permissoes.join(', ');
  }

  // ✅ Método para obter classe CSS baseada na permissão
  getPermissaoClass(permissoes: string[]): string {
    if (!permissoes || permissoes.length === 0) return 'badge-sem-permissao';

    if (permissoes.includes('ADMIN') || permissoes.includes('ADM')) {
      return 'badge-admin';
    }
    if (permissoes.includes('MODERADOR')) {
      return 'badge-moderador';
    }
    return 'badge-usuario';
  }

  // ===============================
  // NAVEGAÇÕES
  // ===============================

  abrirOverlay() {
    this.router.navigate(['/menu/novousuario']);
  }

  editar(usuario: Usuario) {
    this.router.navigate(['/menu/editar-usuario', usuario.id]);
  }

  deletar(usuario: Usuario) {
    this.router.navigate(
      ['/menu/deletar-usuario', usuario.id],
      { state: { fromList: true } }
    );
  }
}

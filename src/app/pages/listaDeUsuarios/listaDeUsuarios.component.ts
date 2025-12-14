import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../shared/loading.service';

import { CadastrarnovoUsuarioComponent } from '../CadastrarnovoUsuario/CadastrarnovoUsuario.component';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  dataCriacao: string;
}

@Component({
  selector: 'app-lista-de-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CadastrarnovoUsuarioComponent
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

  // 🔹 Cadastro
  exibirCadastro = false;

  // 🔹 Exclusão (modal)
  exibirConfirmacaoDelete = false;
  usuarioSelecionado?: Usuario;

  // 🔹 Paginação
  page = 1;
  pageSize = 10;
  total = 0;
  totalPages = 1;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.buscarUsuarios();
  }

  // ===============================
  // BUSCAR USUÁRIOS
  // ===============================
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

  // ===============================
  // PESQUISA
  // ===============================
  pesquisar() {
    const termo = this.termoPesquisa.toLowerCase().trim();

    if (!termo) {
      this.usuariosFiltrados = this.usuarios;
      return;
    }

    this.usuariosFiltrados = this.usuarios.filter(u =>
      u.nome.toLowerCase().includes(termo) ||
      u.email.toLowerCase().includes(termo)
    );
  }

  limparPesquisa() {
    this.termoPesquisa = '';
    this.usuariosFiltrados = this.usuarios;
  }

  // ===============================
  // CADASTRO
  // ===============================
  abrirOverlay() {
    this.exibirCadastro = true;
  }

  fecharOverlay() {
    this.exibirCadastro = false;
  }

  aoSalvarUsuario() {
    this.exibirCadastro = false;
    this.buscarUsuarios(this.page);
  }

  // ===============================
  // AÇÕES
  // ===============================

  deletar(usuario: Usuario) {
    this.usuarioSelecionado = usuario;
    this.exibirConfirmacaoDelete = true;
  }

  cancelarDelecao() {
    this.exibirConfirmacaoDelete = false;
    this.usuarioSelecionado = undefined;
  }

  confirmarDelecao() {
    if (!this.usuarioSelecionado) return;

    this.router.navigate(
      ['/menu/deletar-usuario', this.usuarioSelecionado.id],
      { state: { fromList: true } }
    );

    this.cancelarDelecao();
  }

  editar(usuario: Usuario) {
    this.router.navigate(['/menu/editar-usuario', usuario.id]);
  }


}

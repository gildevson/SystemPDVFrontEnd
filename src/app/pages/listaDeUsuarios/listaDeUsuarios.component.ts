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

  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = []; // ✅ ADICIONADO
  termoPesquisa: string = ''; // ✅ ADICIONADO
  erro = false;

  exibirCadastro = false;

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
    // ⭐ ATIVA O LOADING
    this.loadingService.show();
    this.erro = false;

    // ⭐ MARCA O TEMPO DE INÍCIO
    const startTime = Date.now();

    this.http.get<any>(`https://localhost:7110/api/users?page=${page}&pageSize=${this.pageSize}`)
      .subscribe({
        next: (res) => {
          this.usuarios = res.data;
          this.usuariosFiltrados = res.data; // ✅ INICIALIZA OS FILTRADOS
          this.page = res.page;
          this.pageSize = res.pageSize;
          this.total = res.total;
          this.totalPages = Math.ceil(this.total / this.pageSize);

          // ⭐ CALCULA QUANTO TEMPO PASSOU
          const elapsedTime = Date.now() - startTime;
          // ⭐ GARANTE UM MÍNIMO DE 500ms DE LOADING
          const minLoadingTime = 500;
          const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

          // ⭐ ESPERA O TEMPO RESTANTE ANTES DE ESCONDER
          setTimeout(() => {
            this.loadingService.hide();
          }, remainingTime);
        },
        error: () => {
          this.erro = true;

          // ⭐ MESMO NO ERRO, MANTÉM O DELAY
          const elapsedTime = Date.now() - startTime;
          const minLoadingTime = 500;
          const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

          setTimeout(() => {
            this.loadingService.hide();
          }, remainingTime);
        }
      });
  }

  // ✅ MÉTODO DE PESQUISA
  pesquisar() {
    const termo = this.termoPesquisa.toLowerCase().trim();

    if (!termo) {
      this.usuariosFiltrados = this.usuarios;
      return;
    }

    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.nome.toLowerCase().includes(termo) ||
      usuario.email.toLowerCase().includes(termo)
    );
  }

  // ✅ MÉTODO PARA LIMPAR PESQUISA
  limparPesquisa() {
    this.termoPesquisa = '';
    this.usuariosFiltrados = this.usuarios;
  }

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

  editar(usuario: Usuario) {
    this.router.navigate(['/editar-usuario', usuario.id]);
  }

  deletar(usuario: Usuario) {
    if (confirm(`Tem certeza que deseja deletar o usuário ${usuario.nome}?`)) {
      this.router.navigate(['/menu/deletar-usuario', usuario.id]);
    }
  }
}

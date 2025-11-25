import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
    CadastrarnovoUsuarioComponent
  ],
  templateUrl: './ListaDeUsuarios.component.html',
  styleUrls: ['./ListaDeUsuarios.component.css']
})
export class ListaDeUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  carregando: boolean = true;
  erro: boolean = false;

  exibirCadastro = false;

  // 🔥 variáveis da paginação
  page = 1;
  pageSize = 10;
  total = 0;
  totalPages = 1;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.buscarUsuarios();
  }

 buscarUsuarios(page: number = 1) {
  this.carregando = true;
  this.erro = false;

  this.http.get<any>(`https://localhost:7110/api/users?page=${page}&pageSize=${this.pageSize}`)
    .subscribe({
      next: (res) => {
        this.usuarios = res.data;

        this.page = res.page;
        this.pageSize = res.pageSize;
        this.total = res.total;
        this.totalPages = Math.ceil(this.total / this.pageSize);

        this.carregando = false;
      },
      error: () => {
        this.erro = true;
        this.carregando = false;
      }
    });
}


  abrirOverlay() {
    this.exibirCadastro = true;
  }

  fecharOverlay() {
    this.exibirCadastro = false;
  }

  aoSalvarUsuario() {
    this.exibirCadastro = false;
    this.buscarUsuarios(this.page); // recarrega página atual
  }

  editar(usuario: Usuario) {
    this.router.navigate(['/editar-usuario', usuario.id]);
  }

  deletar(usuario: Usuario) {
    if (confirm(`Tem certeza que deseja apagar ${usuario.nome}?`)) {}
  }
}

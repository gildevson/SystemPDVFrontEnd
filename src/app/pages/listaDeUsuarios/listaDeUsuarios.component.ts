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

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.buscarUsuarios();
  }

  buscarUsuarios() {
    this.http.get<Usuario[]>('https://localhost:7110/api/users')
      .subscribe({
        next: (res) => {
          this.usuarios = res;
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
    this.buscarUsuarios();
  }

  editar(usuario: Usuario) {
    this.router.navigate(['/editar-usuario', usuario.id]);
  }

  deletar(usuario: Usuario) {
    if (confirm(`Tem certeza que deseja apagar ${usuario.nome}?`)) {}
  }
}

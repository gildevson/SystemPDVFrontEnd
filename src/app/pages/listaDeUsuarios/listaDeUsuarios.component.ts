import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  dataCriacao: string;
}

@Component({
  selector: 'app-lista-de-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ListaDeUsuarios.component.html',
  styleUrls: ['./ListaDeUsuarios.component.css']
})
export class ListaDeUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  carregando: boolean = true;
  erro: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.buscarUsuarios();
  }

  buscarUsuarios() {
    this.carregando = true;
    this.erro = false;

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

  irParaNovoUsuario() {
    this.router.navigate(['/menu/novousuario']);
  }

  editar(usuario: Usuario) {
    this.router.navigate(['/editar-usuario', usuario.id]);
  }

  deletar(usuario: Usuario) {
    if (confirm(`Tem certeza que deseja apagar ${usuario.nome}?`)) {
      // aqui você insere o delete
    }
  }
}

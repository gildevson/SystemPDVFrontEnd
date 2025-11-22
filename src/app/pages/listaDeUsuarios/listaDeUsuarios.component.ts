import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-de-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ListaDeUsuarios.component.html',
  styleUrls: ['./ListaDeUsuarios.component.css']
})
export class ListaDeUsuariosComponent implements OnInit {

  usuarios: any[] = [];
  carregando: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.buscarUsuarios();
  }

  buscarUsuarios() {
    this.http.get<any[]>('http://localhost:5000/api/users')
      .subscribe({
        next: (res) => {
          this.usuarios = res;
          this.carregando = false;
        },
        error: () => {
          alert('Erro ao carregar usuários.');
          this.carregando = false;
        }
      });
  }
}

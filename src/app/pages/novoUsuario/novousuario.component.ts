import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './novousuario.component.html',
  styleUrls: ['./novousuario.component.css']
})
export class NovoUsuarioComponent {

  nome: string = '';
  email: string = '';
  senha: string = '';
  carregando: boolean = false;
  erro: string = '';
  sucesso: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  salvar() {
    this.erro = '';
    this.sucesso = false;
    this.carregando = true;

    const novoUsuario = {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    };

    this.http.post('https://localhost:7110/api/users', novoUsuario)
      .subscribe({
        next: () => {
          this.carregando = false;
          this.sucesso = true;

          setTimeout(() => {
            this.router.navigate(['/usuarios']);
          }, 800);
        },
        error: (err) => {
          this.carregando = false;
          this.erro = 'Erro ao criar usuário. Verifique os dados.';
        }
      });
  }
}

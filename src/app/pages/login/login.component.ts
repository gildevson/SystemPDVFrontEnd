import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../shared/loading.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})export class LoginComponent {

  email: string = '';
  senha: string = '';
  loginMessage: string = '';
  messageType: 'success' | 'error' | 'warning' = 'error'; // ✨ Novo

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  fazerLogin() {
    if (!this.email || !this.senha) {
      this.loginMessage = 'Preencha todos os campos.';
      this.messageType = 'warning';
      return;
    }

    this.loadingService.show();

    this.authService.login(this.email, this.senha).subscribe({
      next: (res) => {
        localStorage.setItem('nome', res.usuario.nome);
        localStorage.setItem('email', res.usuario.email);
        localStorage.setItem('id', res.usuario.id);
        localStorage.setItem('permissoes', JSON.stringify(res.usuario.permissoes || []));

        this.loginMessage = 'Login realizado com sucesso!';
        this.messageType = 'success'; // ✨ Sucesso

        setTimeout(() => {
          this.loadingService.hide();
          this.router.navigate(['/menu']);
        }, 1000);
      },

      error: () => {
        this.loadingService.hide();
        this.loginMessage = 'Usuário ou senha incorretos.';
        this.messageType = 'error'; // ✨ Erro
      }
    });
  }
}

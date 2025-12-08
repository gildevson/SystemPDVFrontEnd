import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../shared/loading.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  senha: string = '';
  loginMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  fazerLogin() {

    if (!this.email || !this.senha) {
      this.loginMessage = 'Preencha todos os campos.';
      return;
    }

    this.loadingService.show();

    this.authService.login(this.email, this.senha).subscribe({
      next: (res) => {

        // 💾 SALVAR DADOS DO USUÁRIO
        localStorage.setItem('nome', res.usuario.nome);
        localStorage.setItem('email', res.usuario.email);
        localStorage.setItem('id', res.usuario.id);

        this.loginMessage = 'Login realizado com sucesso!';

        setTimeout(() => {
          this.loadingService.hide();
          this.router.navigate(['/menu']);
        }, 1000);
      },

      error: () => {
        this.loadingService.hide();
        this.loginMessage = 'Usuário ou senha incorretos.';
      }
    });
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ✅ Para redirecionamento pós-login
import { AuthService } from '../../services/auth.service';

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
    private router: Router // ✅ Injeta o roteador para redirecionamento
  ) {}

  fazerLogin() {
    if (!this.email || !this.senha) {
      this.loginMessage = 'Preencha todos os campos.';
      return;
    }

    this.authService.login(this.email, this.senha).subscribe({
      next: (res) => {
        this.loginMessage = res.mensagem;
        localStorage.setItem('token', res.token);

        // ✅ Redireciona após login com sucesso
        this.router.navigate(['/menu']);
      },
      error: () => {
        this.loginMessage = 'Usuário ou senha incorretos.';
      }
    });
  }
}

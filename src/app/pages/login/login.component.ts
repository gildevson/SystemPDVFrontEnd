import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../shared/loading.service'; // ✅ IMPORTANTE

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
    private loadingService: LoadingService // ✅ INJETADO
  ) {}

  fazerLogin() {

    if (!this.email || !this.senha) {
      this.loginMessage = 'Preencha todos os campos.';
      return;
    }

    // 🔵 Mostra loading
    this.loadingService.show();

    this.authService.login(this.email, this.senha).subscribe({
      next: (res) => {
        this.loginMessage = res.mensagem;
        localStorage.setItem('token', res.token);

        setTimeout(() => {
          // 🔵 Esconde loading depois de 1 segundos (fica mais bonito)
          this.loadingService.hide();
          this.router.navigate(['/menu']);
        }, 1000);
      },

      error: () => {
        this.loadingService.hide(); // 🔴 Remove loading mesmo com erro
        this.loginMessage = 'Usuário ou senha incorretos.';
      }
    });
  }
}

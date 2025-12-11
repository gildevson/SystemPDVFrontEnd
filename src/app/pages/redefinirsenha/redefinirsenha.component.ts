import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-redefinirsenha',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './redefinirsenha.component.html',
  styleUrls: ['./redefinirsenha.component.css']
})
export class RedefinirsenhaComponent {
  token = '';
  senha = '';
  confirmar = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private toast: ToastService
  ) {
    this.route.queryParams.subscribe(p => {
      this.token = p['token'];
    });
  }

  redefinir() {
    if (!this.senha || !this.confirmar) {
      this.toast.warning('Preencha todos os campos.');
      return;
    }

    if (this.senha !== this.confirmar) {
      this.toast.error('As senhas não coincidem!');
      return;
    }

    if (this.senha.length < 6) {
      this.toast.warning('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    this.auth.redefinirSenha({
      token: this.token,
      novaSenha: this.senha
    }).subscribe({
      next: () => {
        this.toast.success('Senha redefinida com sucesso!');
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: err => {
        this.toast.error(err.error?.mensagem || 'Erro ao redefinir senha.');
      }
    });
  }
}
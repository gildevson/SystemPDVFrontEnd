import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recuperarsenha',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './recuperarsenha.component.html',
  styleUrls: ['./recuperarsenha.component.css']
})
export class RecuperarsenhaComponent {
  email = '';

  constructor(
    private auth: AuthService,
    private toast: ToastService
  ) {}

  solicitar() {
    if (!this.email) {
      this.toast.warning('Por favor, digite seu e-mail.');
      return;
    }

    this.auth.solicitarResetSenha(this.email).subscribe({
      next: () => {
        this.toast.success('Link de redefinição enviado! Verifique seu e-mail.');
        this.email = '';
      },
      error: err => {
        this.toast.error(err.error?.mensagem || 'Erro ao solicitar redefinição.');
      }
    });
  }
}
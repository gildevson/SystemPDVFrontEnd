import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-recuperarsenha',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recuperarsenha.component.html',
  styleUrls: ['./recuperarsenha.component.css']
})
export class RecuperarsenhaComponent {

  email = '';

  constructor(private auth: AuthService) {}

  solicitar() {
    this.auth.solicitarResetSenha(this.email).subscribe({
      next: () => alert('Enviamos um link para redefinir sua senha.'),
      error: err => alert(err.error?.mensagem || 'Erro ao solicitar redefinição.')
    });
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
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

  constructor(private route: ActivatedRoute, private auth: AuthService) {
    this.route.queryParams.subscribe(p => {
      this.token = p['token'];
    });
  }

  redefinir() {

    if (this.senha !== this.confirmar) {
      alert("As senhas não coincidem!");
      return;
    }

    this.auth.redefinirSenha({
      token: this.token,
      novaSenha: this.senha
    }).subscribe({
      next: () => alert("Senha redefinida com sucesso!"),
      error: err => alert(err.error?.mensagem || "Erro ao redefinir senha.")
    });
  }
}

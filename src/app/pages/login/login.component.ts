import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']   // <-- CORRIGIDO
})
export class LoginComponent {

  email: WritableSignal<string> = signal('');
  senha: WritableSignal<string> = signal('');
  loginMessage: WritableSignal<string> = signal('');

  constructor(private authService: AuthService) {}

 fazerLogin() {
  const emailValue = this.email();
  const senhaValue = this.senha();

  if (!emailValue || !senhaValue) {
    this.loginMessage.set("Preencha todos os campos.");
    return;
  }

  this.authService.login(emailValue, senhaValue).subscribe({
    next: (res) => {
      this.loginMessage.set(res.mensagem);
      console.log("Resposta do backend:", res);
    },
    error: (err) => {
      this.loginMessage.set("Usuário ou senha incorretos.");
      console.error(err);
    }
  });
}
}

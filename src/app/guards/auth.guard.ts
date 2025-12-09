import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {

    // Verifica se existem dados salvos no login
    const id = localStorage.getItem('id');
    const email = localStorage.getItem('email');
    const nome = localStorage.getItem('nome');

    // Se existe → usuário autenticado → libera rota
    if (id && email && nome) {
      return true;
    }

    // Caso contrário → bloqueia e volta para login
    this.router.navigate(['/']);
    return false;
  }
}

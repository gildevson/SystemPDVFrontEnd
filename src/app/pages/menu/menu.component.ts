import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../shared/loading.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  menuItems = [
    { nome: 'Dashboard Geral', rota: '/dashboard', icone: 'dashboard' },
    { nome: 'Usuários do Sistema', rota: '/usuarios', icone: 'groups' },
    { nome: 'Configurações', rota: '/configuracoes', icone: 'settings' },
    { nome: 'Relatórios', rota: '/relatorios', icone: 'bar_chart' },
    { nome: 'Operação PDV', rota: '/operacao', icone: 'point_of_sale' }
  ];

  constructor(
    private router: Router,
    private loadingService: LoadingService
  ) {}

  navegar(rota: string) {
    this.loadingService.show();   // MOSTRA O LOADING

    setTimeout(() => {
      this.router.navigate([rota]).then(() => {
        this.loadingService.hide(); // ESCONDE O LOADING
      });
    }, 200); // delay suave
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}

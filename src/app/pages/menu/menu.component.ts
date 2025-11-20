import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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

    // ➕ NOVO ITEM: OPERAÇÃO DO PDV
    { nome: 'Operação PDV', rota: '/operacao', icone: 'point_of_sale' }
  ];

  constructor(private router: Router) {}

  navegar(rota: string) {
    this.router.navigate([rota]);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}

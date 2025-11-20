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
    { nome: 'Usuários', rota: '/usuarios', icone: 'person' },
    { nome: 'Produtos', rota: '/produtos', icone: 'inventory_2' },
    { nome: 'Estoque', rota: '/estoque', icone: 'store' },
    { nome: 'Conta Contábil', rota: '/contas-contabeis', icone: 'account_balance' },
    { nome: 'Operações', rota: '/operacoes', icone: 'receipt_long' },
    { nome: 'Relatórios', rota: '/relatorios', icone: 'bar_chart' }
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

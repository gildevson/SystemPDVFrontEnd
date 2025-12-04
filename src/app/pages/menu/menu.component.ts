import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';   // 👈 IMPORTANTE
import { LoadingService } from '../../shared/loading.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule   // 👈 SEM ISSO O ROUTER-OUTLET NÃO FUNCIONA
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  menuItems = [
    { nome: 'Dashboard Geral', rota: 'dashboard', icone: 'dashboard' },
    { nome: 'Usuários do Sistema', rota: 'usuarios', icone: 'groups' },
    { nome: 'Configurações', rota: 'configuracoes', icone: 'settings' },
    { nome: 'Relatórios', rota: 'relatorios', icone: 'bar_chart' },
    { nome: 'Operação PDV', rota: 'operacao', icone: 'point_of_sale' }
  ];

  constructor(
    private router: Router,
    private loadingService: LoadingService
  ) {}

  navegar(rota: string) {
    this.router.navigate(['/menu', rota]);   // 👈 AJUSTADO PARA ROTA FILHA
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  isSidebarOpen = false;

  toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
  }

}

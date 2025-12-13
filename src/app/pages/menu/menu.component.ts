import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoadingService } from '../../shared/loading.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
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

  // 🔥 VARIÁVEL DO NOME
  nomeUsuario: string = '';

  constructor(
    private router: Router,
    private loadingService: LoadingService
  ) {
    // 🔥 PEGA O NOME QUE O LOGIN SALVOU
    this.nomeUsuario = localStorage.getItem('nome') || 'Usuário';
  }

  navegar(rota: string) {
    // Mostra o loading
    this.loadingService.show();

    // Navega para a rota
    this.router.navigate(['/menu', rota]).then(() => {
      // Esconde o loading após a navegação
      // Pequeno delay para garantir que o componente carregou
      setTimeout(() => {
        this.loadingService.hide();
      }, 500);
    });

    // Fecha a sidebar no mobile
    this.isSidebarOpen = false;
  }

  logout() {
    // Mostra loading ao fazer logout
    this.loadingService.show();

    // Remove dados do localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
    localStorage.removeItem('email');

    // Navega para login e esconde o loading
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        this.loadingService.hide();
      }, 300);
    });
  }

  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}

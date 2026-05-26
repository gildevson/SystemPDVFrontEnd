import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoadingService } from '../../shared/loading.service';

interface MenuItem {
  nome: string;
  rota?: string;
  icone: string;
  permissao?: string;
  submenu?: MenuItem[];
  expanded?: boolean;
  isSection?: boolean;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  menuItems: MenuItem[] = [
    { nome: 'Principal', icone: '', isSection: true },
    {
      nome: 'Dashboard',
      rota: 'usuarios',
      icone: 'dashboard'
    },
    { nome: 'Gestão', icone: '', isSection: true },
    {
      nome: 'Cadastros',
      icone: 'folder_open',
      submenu: [
        { nome: 'Usuários', rota: 'usuarios', icone: 'group', permissao: 'ADMIN' },
        { nome: 'Produtos', rota: 'produtos', icone: 'inventory_2' },
        { nome: 'Clientes', rota: 'clientes', icone: 'people' },
        { nome: 'Fornecedores', rota: 'fornecedores', icone: 'local_shipping' },
        { nome: 'Categorias', rota: 'categorias', icone: 'category' }
      ]
    },
    {
      nome: 'Operações',
      icone: 'storefront',
      submenu: [
        { nome: 'PDV', rota: 'operacao/pdv', icone: 'point_of_sale' },
        { nome: 'Vendas', rota: 'operacao/vendas', icone: 'shopping_cart' },
        { nome: 'Estoque', rota: 'operacao/estoque', icone: 'warehouse' }
      ]
    },
    { nome: 'Análise', icone: '', isSection: true },
    {
      nome: 'Relatórios',
      icone: 'bar_chart',
      submenu: [
        { nome: 'Vendas', rota: 'relatorios/vendas', icone: 'analytics' },
        { nome: 'Financeiro', rota: 'relatorios/financeiro', icone: 'attach_money' },
        { nome: 'Estoque', rota: 'relatorios/estoque', icone: 'assessment' }
      ]
    },
    { nome: 'Sistema', icone: '', isSection: true },
    {
      nome: 'Configurações',
      rota: 'configuracoes',
      icone: 'tune'
    }
  ];

  nomeUsuario: string = '';
  emailUsuario: string = '';
  isSidebarOpen = false;

  get iniciais(): string {
    return this.nomeUsuario
      .split(' ')
      .slice(0, 2)
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  constructor(
    public router: Router, // ✅ MUDOU DE private PARA public
    private loadingService: LoadingService
  ) {
    this.nomeUsuario = localStorage.getItem('nome') || 'Usuário';
    this.emailUsuario = localStorage.getItem('email') || '';
  }

  // ✅ Ler permissões
  getPermissoes(): string[] {
    return JSON.parse(localStorage.getItem('permissoes') || '[]');
  }

  // ✅ Verificar permissão
  hasPermissao(permissao?: string): boolean {
    if (!permissao) return true;
    return this.getPermissoes().includes(permissao);
  }

  // ✨ Alternar submenu
  toggleSubmenu(item: MenuItem) {
    if (item.submenu) {
      item.expanded = !item.expanded;
    } else if (item.rota) {
      this.navegar(item.rota);
    }
  }

  // ✅ Navegar
  navegar(rota: string) {
    this.loadingService.show();

    this.router.navigate(['/menu', rota]).then(() => {
      setTimeout(() => this.loadingService.hide(), 500);
    });

    this.isSidebarOpen = false;
  }

  // ✅ Logout
  logout() {
    this.loadingService.show();

    localStorage.removeItem('token');
    localStorage.removeItem('nome');
    localStorage.removeItem('email');
    localStorage.removeItem('permissoes');

    this.router.navigate(['/']).then(() => {
      setTimeout(() => this.loadingService.hide(), 300);
    });
  }

  // ✅ Toggle sidebar mobile
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // ✨ Método auxiliar para verificar se a rota está ativa
  isRouteActive(rota?: string): boolean {
    if (!rota) return false;
    return this.router.url.includes(rota);
  }
}

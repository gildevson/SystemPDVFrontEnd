import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AuthGuard } from './guards/auth.guard';
import { OperacaoComponent } from './pages/operacao/operacao.component';
import { DeleteUsuariosComponent } from './pages/DeletarUsuario/DeleteUsuarios.component';
import { ListaDeUsuariosComponent } from './pages/listaDeUsuarios/listaDeUsuarios.component';


export const routes: Routes = [
  { path: '', component: LoginComponent },

  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: OperacaoComponent },
      { path: 'usuarios', component: ListaDeUsuariosComponent },
      { path: 'deletar-usuario/:id', component: DeleteUsuariosComponent },
      // ⬇ NOVA ROTA AQUI
      {
        path: 'novousuario',
        loadComponent: () => import('./pages/CadastrarnovoUsuario/CadastrarnovoUsuario.component')
          .then(m => m.CadastrarnovoUsuarioComponent)
      },

      { path: 'operacao', component: OperacaoComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

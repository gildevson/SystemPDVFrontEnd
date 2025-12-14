import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AuthGuard } from './guards/auth.guard';
import { OperacaoComponent } from './pages/operacao/operacao.component';
import { DeleteUsuariosComponent } from './pages/DeletarUsuario/DeleteUsuarios.component';
import { ListaDeUsuariosComponent } from './pages/listaDeUsuarios/listaDeUsuarios.component';
import { RecuperarsenhaComponent } from './pages/recuperarsenha/recuperarsenha.component';
import { RedefinirsenhaComponent } from './pages/redefinirsenha/redefinirsenha.component';
import { AtualizarUsuarioComponent } from './pages/AtualizandoUsuarios/AtualizandoUsuarios.component'; // 👈 IMPORTAR

export const routes: Routes = [

  // 🔓 Rotas públicas
  { path: '', component: LoginComponent },
  { path: 'recuperarsenha', component: RecuperarsenhaComponent },
  { path: 'redefinirsenha', component: RedefinirsenhaComponent },

  // 🔐 Rotas protegidas
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: OperacaoComponent },
      { path: 'usuarios', component: ListaDeUsuariosComponent },
      { path: 'deletar-usuario/:id', component: DeleteUsuariosComponent },
      { path: 'editar-usuario/:id', component: AtualizarUsuarioComponent }, // 👈 SEM 'menu/'

      {
        path: 'novousuario',
        loadComponent: () =>
          import('./pages/CadastrarnovoUsuario/CadastrarnovoUsuario.component')
            .then(m => m.CadastrarUsuarioComponent)
      },

      { path: 'operacao', component: OperacaoComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

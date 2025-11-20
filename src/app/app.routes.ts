import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AuthGuard } from './guards/auth.guard';
import { OperacaoComponent } from './pages/operacao/operacao.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },

  // 🔐 Rota protegida
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },

  // 🧾 Tela de operação PDV
  { path: 'operacao', component: OperacaoComponent }
];

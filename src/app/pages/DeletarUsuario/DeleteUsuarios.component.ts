import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './DeleteUsuarios.component.html',
  styleUrls: ['./DeleteUsuarios.component.css']
})
export class DeleteUsuariosComponent implements OnInit {

  userId = '';
  nomeUsuario = '';
  emailUsuario = '';
  confirmacaoNome = '';

  carregando = true;
  excluindo = false;

  // ✅ precisa existir para o HTML usar
  isSelfDelete = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {

    // 🔐 bloqueia acesso direto
    if (!history.state?.fromList) {
      this.toast.warning('Acesso inválido à exclusão de usuário', 'Atenção');
      this.router.navigate(['/menu/usuarios']);
      return;
    }

    this.userId = this.route.snapshot.paramMap.get('id') ?? '';

    if (!this.userId) {
      this.toast.error('ID inválido', 'Erro');
      this.router.navigate(['/menu/usuarios']);
      return;
    }

    // ✅ calcula UMA vez (estado da tela)
    const idLogado = localStorage.getItem('id');
    this.isSelfDelete = !!idLogado && this.userId === idLogado;

    this.buscarUsuario();
  }

  private buscarUsuario() {
    this.http.get<any>(`https://localhost:7110/api/users/${this.userId}`)
      .subscribe({
        next: (res) => {
          this.nomeUsuario = res.nome;
          this.emailUsuario = res.email;
          this.carregando = false;
        },
        error: () => {
          this.carregando = false;
          this.toast.error('Usuário não encontrado', 'Erro');
          this.router.navigate(['/menu/usuarios']);
        }
      });
  }

  cancelar() {
    this.router.navigate(['/menu/usuarios']);
  }

  confirmarExclusao() {

    if (this.confirmacaoNome.trim() !== this.nomeUsuario) {
      this.toast.warning('Digite o nome exatamente igual ao exibido', 'Confirmação necessária');
      return;
    }

    // ✅ se for o próprio usuário, bloqueia
    if (this.isSelfDelete) {
      this.toast.warning(
        'Por motivos de segurança, você não pode excluir o seu próprio usuário logado.',
        'Ação bloqueada'
      );
      return;
    }

    this.excluindo = true;

    const idLogado = localStorage.getItem('id');

    this.http.delete('https://localhost:7110/api/Auth', {
      body: {
        id: this.userId,
        idLogado: idLogado
      }
    }).subscribe({
      next: () => {
        this.toast.success(`Usuário "${this.nomeUsuario}" excluído com sucesso!`, 'Exclusão realizada');

        setTimeout(() => {
          this.router.navigate(['/menu/usuarios']);
        }, 500);
      },

      error: (err: HttpErrorResponse) => {
        this.excluindo = false;

        const msg =
          err.error?.mensagem ||
          err.error?.message ||
          'Erro ao excluir usuário. Tente novamente.';

        const msgLower = String(msg).toLowerCase();

        // ✅ se backend bloquear (bypass), mostrar warning
        if (msgLower.includes('não pode excluir') || msgLower.includes('proprio') || msgLower.includes('próprio')) {
          this.toast.warning(
            'Por motivos de segurança, você não pode excluir o seu próprio usuário logado.',
            'Ação bloqueada'
          );
          return;
        }

        this.toast.error(msg, 'Erro');
      }
    });
  }
}

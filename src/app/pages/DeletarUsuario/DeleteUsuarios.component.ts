import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './DeleteUsuarios.component.html',
  styleUrls: ['./DeleteUsuarios.component.css']
})
export class DeleteUsuariosComponent implements OnInit {

  // 🔹 Dados do usuário
  userId = '';
  nomeUsuario = '';
  emailUsuario = '';

  // 🔹 Confirmação
  confirmacaoNome = '';

  // 🔹 Estados de UI
  carregando = true;
  excluindo = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {

    // 🔐 Bloqueia acesso direto (opcional, mas recomendado)
    if (!history.state?.fromList) {
      this.toast.warning(
        'Acesso inválido à exclusão de usuário',
        'Atenção'
      );
      this.router.navigate(['/menu/usuarios']);
      return;
    }

    this.userId = this.route.snapshot.paramMap.get('id') ?? '';

    if (!this.userId) {
      this.toast.error('ID inválido', 'Erro');
      this.router.navigate(['/menu/usuarios']);
      return;
    }

    this.buscarUsuario();
  }

  // 🔍 Busca dados do usuário
  private buscarUsuario() {
    this.http.get<any>(`https://localhost:7110/api/users/${this.userId}`)
      .subscribe({
        next: (res) => {
          this.nomeUsuario = res.nome;
          this.emailUsuario = res.email;
          this.carregando = false;
        },
        error: () => {
          this.toast.error('Usuário não encontrado', 'Erro');
          this.router.navigate(['/menu/usuarios']);
        }
      });
  }

  // ❌ Cancelar exclusão
  cancelar() {
    this.router.navigate(['/menu/usuarios']);
  }

  // ✅ Confirmar exclusão
  confirmarExclusao() {

    if (this.confirmacaoNome.trim() !== this.nomeUsuario) {
      this.toast.warning(
        'Digite o nome exatamente igual ao exibido',
        'Confirmação necessária'
      );
      return;
    }

    this.excluindo = true;

    const body = { id: this.userId };

    this.http.delete('https://localhost:7110/api/Auth', { body })
      .subscribe({
        next: () => {
          this.toast.success(
            `Usuário "${this.nomeUsuario}" excluído com sucesso!`,
            'Exclusão realizada'
          );

          // ⏳ Delay pequeno para UX
          setTimeout(() => {
            this.router.navigate(['/menu/usuarios']);
          }, 500);
        },
        error: () => {
          this.excluindo = false;
          this.toast.error(
            'Erro ao excluir usuário. Tente novamente.',
            'Erro'
          );
        }
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ ngModel funcionando
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
      this.toast.warning(
        'Digite o nome exatamente igual ao exibido',
        'Confirmação necessária'
      );
      return;
    }

    this.excluindo = true;

    this.http.delete('https://localhost:7110/api/Auth', {
      body: { id: this.userId }
    }).subscribe({
      next: () => {
        this.toast.success(
          `Usuário "${this.nomeUsuario}" excluído com sucesso!`,
          'Exclusão realizada'
        );

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

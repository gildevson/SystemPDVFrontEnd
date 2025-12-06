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

  userId = "";
  nomeUsuario = "";
  confirmacaoNome = "";
  carregando = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') ?? "";

    if (!this.userId) {
      this.toast.error("ID inválido", "Erro");
      this.router.navigate(['/menu/usuarios']);
      return;
    }

    this.http.get<any>(`https://localhost:7110/api/users/${this.userId}`)
      .subscribe({
        next: (res) => {
          this.nomeUsuario = res.nome;
          this.carregando = false;
        },
        error: () => {
          this.toast.error("Usuário não encontrado", "Erro");
          this.router.navigate(['/menu/usuarios']);
        }
      });
  }

  cancelar() {
    this.router.navigate(['/menu/usuarios']);
  }

  confirmarExclusao() {
  if (this.confirmacaoNome !== this.nomeUsuario) {
    this.toast.warning("Digite o nome exatamente igual", "Atenção");
    return;
  }

  const body = { id: this.userId };

  this.http.delete("https://localhost:7110/api/Auth", { body })
    .subscribe({
      next: () => {
        // ⬇ TOAST DE SUCESSO — SEPARADO DO RESTANTE
        this.toast.success(
          `Usuário ${this.nomeUsuario} excluído com sucesso!`,
          "Exclusão realizada"
        );

        this.router.navigate(['/menu/usuarios']);
      },
      error: () => {
        // ⬇ TOAST DE ERRO — SEPARADO
        this.toast.error("Erro ao excluir usuário.", "Erro");
      }
    });
}
}

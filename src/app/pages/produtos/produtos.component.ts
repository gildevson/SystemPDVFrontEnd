import { Component } from "@angular/core"; //Esse aqui chama 
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { LoadingService } from "../../shared/loading.service";
import { Router } from "@angular/router";

interface Produtos {
    nome: string;
    Descricao: string;
    Preco: number;
    Ativo: boolean;
    CriadoEm: string;
    AtualizadoEm: string;
}

@Component({
    selector: "app-produtos",
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: "./produtos.components.html",
    styleUrls: ["./produtos.component.css"],
})
export class ProdutosComponent {
    produtos: Produtos[] = [];
    erro = false;

})
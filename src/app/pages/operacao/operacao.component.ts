import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './operacao.component.html',
  styleUrls: ['./operacao.component.css']
})
export class OperacaoComponent {

  constructor(private router: Router) {}

  voltarMenu() {
    this.router.navigate(['/menu']);
  }

}

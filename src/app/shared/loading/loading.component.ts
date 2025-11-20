import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],   // NECESSÁRIO PARA USAR *ngIf
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

  isLoading = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.loading$.subscribe((value: boolean) => {
      this.isLoading = value;
    });
  }
}

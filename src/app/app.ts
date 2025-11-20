import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { LoadingComponent } from './shared/loading/loading.component';
import { LoadingService } from './shared/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoadingComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  constructor(
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.router.events.subscribe(event => {

      // Quando começar a navegar → mostra loader
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      }

      // Quando terminar → esconde loader
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.loadingService.hide();
        }, 300); // atraso para animação suave
      }

    });
  }
}

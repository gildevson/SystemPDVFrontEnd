import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  dataCriacao?: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private backendUrl$ = new ReplaySubject<string>(1);

  constructor(private http: HttpClient) {
    if ((window as any).backend) {
      (window as any).backend.onUrlReady((url: string) => {
        console.log('🔥 Backend URL recebida (UserService):', url);
        this.backendUrl$.next(url);
      });
    } else {
      console.warn('⚠️ Rodando no navegador — usando URL padrão');
      this.backendUrl$.next('https://localhost:7110');
    }
  }

atualizarUsuario(id: string, payload: any): Observable<any> {
    return new Observable(observer => {
      this.backendUrl$.subscribe(url => {
        const fullUrl = `${url}/api/usuarios/${id}`;
        console.log('✏️ Atualizando usuário:', fullUrl, payload);

        this.http.put(fullUrl, payload).subscribe({
          next: res => observer.next(res),
          error: err => observer.error(err)
        });
      });
    });
  }
}

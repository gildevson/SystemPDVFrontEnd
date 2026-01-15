import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

export interface LoginResponse {
  mensagem: string;
  token: string;
  usuario: {
    id: string;
    nome: string;
    email: string;
    permissoes: string[];
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Guarda a URL do backend carregada pelo Electron
  private backendUrl$ = new ReplaySubject<string>(1);

  constructor(private http: HttpClient) {
    // 🔥 Recebe a porta dinâmica do backend via preload.js
    if ((window as any).backend) {
      (window as any).backend.onUrlReady((url: string) => {
        console.log('🔥 Backend URL recebida do Electron:', url);
        this.backendUrl$.next(url);
      });
    } else {
      console.warn('⚠️ Rodando no navegador — backend dinâmico desabilitado.');
      this.backendUrl$.next('https://localhost:7110'); // fallback DEV
    }
  }

  // Login usando HttpClient de forma normal
  login(email: string, senha: string): Observable<LoginResponse> {
    return new Observable(observer => {
      this.backendUrl$.subscribe(url => {
        const fullUrl = `${url}/api/Auth/login`;
        console.log("Chamando login em:", fullUrl);

        this.http.post<LoginResponse>(fullUrl, { email, senha })
          .subscribe({
            next: res => observer.next(res),
            error: err => observer.error(err)
          });
      });
    });
  }

  // ==============================
// 🔥 SOLICITAR RESET DE SENHA
// ==============================
solicitarResetSenha(email: string): Observable<any> {
  return new Observable(observer => {
    this.backendUrl$.subscribe(url => {
      const fullUrl = `${url}/auth/reset/solicitar`;
      console.log("Chamando solicitar reset em:", fullUrl);

      this.http.post(fullUrl, { email })
        .subscribe({
          next: res => observer.next(res),
          error: err => observer.error(err)
        });
    });
  });
}

// ==============================
// 🔥 REDEFINIR SENHA
// ==============================
redefinirSenha(dto: { token: string; novaSenha: string }): Observable<any> {
  return new Observable(observer => {
    this.backendUrl$.subscribe(url => {
      const fullUrl = `${url}/auth/reset/resetar`;

      console.log("Chamando redefinir senha:", fullUrl);

      this.http.post(fullUrl, dto)
        .subscribe({
          next: res => observer.next(res),
          error: err => observer.error(err)
        });
    });
  });
}

atualizarUsuario(id: string, payload: any): Observable<any> {
    return new Observable(observer => {
      this.backendUrl$.subscribe(url => {
        const fullUrl = `${url}/api/usuarios/${id}`;

        this.http.put(fullUrl, payload).subscribe({
          next: res => observer.next(res),
          error: err => observer.error(err)
        });
      });
    });
  }

}

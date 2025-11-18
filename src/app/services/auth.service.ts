import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response'; // <-- IMPORTANTE

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'https://localhost:7206/api/user/login';
  constructor(private http: HttpClient) { }

  login(email: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { email, senha });
  }
}

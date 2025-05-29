import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  token: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  loginUsuario(data: { correo: string; contrasena: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:8080/auth/login', data);
  }
}

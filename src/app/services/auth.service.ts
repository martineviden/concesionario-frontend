import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) {}

  login(correo: string, contrasena: string) {
    return this.http.post<{ token: string, rol: string }>(
      `${this.baseUrl}/auth/login`,
      { correo, contrasena }
    );
  }

  guardarToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('jwt');
  }

  cerrarSesion() {
    localStorage.removeItem('jwt');
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }
}

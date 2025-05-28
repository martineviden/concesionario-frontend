import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/login.model';
import { Rol } from '../models/enums';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private usuarioActual = new BehaviorSubject<Usuario | null>(null);
  private estaAuth = new BehaviorSubject<boolean>(false);
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
    // Recuperar el estado de inicio de sesión del localStorage al iniciar
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      // Asegurarnos de que el rol se convierte al enum correctamente
      if (usuario.rol) {
        usuario.rol = Rol[usuario.rol as keyof typeof Rol];
      }
      this.usuarioActual.next(usuario);
      this.estaAuth.next(true);
    }
  }

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

  obtenerUsuarioActual(): Observable<Usuario | null> {
    return this.usuarioActual.asObservable();
  }
  
  cerrarSesion() {
    this.usuarioActual.next(null);
    this.estaAuth.next(false);
    localStorage.removeItem('usuario');
    localStorage.removeItem('jwt');
  }

  obtenerEstadoAutenticacion(): Observable<boolean> {
    return this.estaAuth.asObservable();
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/login.model';
import { UsuarioSession } from '../models/usuario.model'; // <- Este archivo solo tiene UsuarioSession
import { Rol } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Usuario completo (para CRUD si lo necesitas en otra vista)
  private usuarioActual = new BehaviorSubject<Usuario | null>(null);

  // Usuario solo para sesión/login
  private usuarioActualSesion = new BehaviorSubject<UsuarioSession | null>(null);

  private estaAutenticado = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      if (usuario.rol) {
        usuario.rol = Rol[usuario.rol as keyof typeof Rol];
      }
      this.usuarioActualSesion.next(usuario);
      this.estaAutenticado.next(true);
    }
  }

  login(correo: string, contrasena: string): Observable<any> {
    return this.http.post<any>('http://localhost:8080/auth/login', { correo, contrasena });
  }

  iniciarSesion(usuario: UsuarioSession) {
    if (typeof usuario.rol === 'string') {
      usuario.rol = Rol[usuario.rol as keyof typeof Rol];
    }

    this.usuarioActualSesion.next(usuario);
    this.estaAutenticado.next(true);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  cerrarSesion() {
    this.usuarioActual.next(null);
    this.usuarioActualSesion.next(null);
    this.estaAutenticado.next(false);
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
  }

  // Para vistas que usen el CRUD (usuario completo)
  obtenerUsuarioParaCrud(): Observable<Usuario | null> {
    return this.usuarioActual.asObservable();
  }

  // Para vistas que solo necesitan saber quién inició sesión
  obtenerUsuarioDeSesion(): Observable<UsuarioSession | null> {
    return this.usuarioActualSesion.asObservable();
  }

  obtenerEstadoAutenticacion(): Observable<boolean> {
    return this.estaAutenticado.asObservable();
  }
}

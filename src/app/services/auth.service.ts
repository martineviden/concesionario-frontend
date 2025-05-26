import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActual = new BehaviorSubject<Usuario | null>(null);
  private estaAutenticado = new BehaviorSubject<boolean>(false);

  constructor() {
    // tener elestado de inciio de sesion del localStorage al iniciar
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuarioActual.next(JSON.parse(usuarioGuardado));
      this.estaAutenticado.next(true);
    }
  }

  iniciarSesion(usuario: Usuario) {
    this.usuarioActual.next(usuario);
    this.estaAutenticado.next(true);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  cerrarSesion() {
    this.usuarioActual.next(null);
    this.estaAutenticado.next(false);
    localStorage.removeItem('usuario');
  }

  obtenerUsuarioActual(): Observable<Usuario | null> {
    return this.usuarioActual.asObservable();
  }

  obtenerEstadoAutenticacion(): Observable<boolean> {
    return this.estaAutenticado.asObservable();
  }
} 
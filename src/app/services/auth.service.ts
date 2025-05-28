import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/login.model';
import { Rol } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
<<<<<<< Updated upstream

  private usuarioActual = new BehaviorSubject<Usuario | null>(null);
  private estaAuth = new BehaviorSubject<boolean>(false);
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
=======
  private usuarioActual = new BehaviorSubject<Usuario | null>(null);
  private estaAutenticado = new BehaviorSubject<boolean>(false);

  constructor() {
>>>>>>> Stashed changes
    // Recuperar el estado de inicio de sesión del localStorage al iniciar
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      // Asegurarnos de que el rol se convierte al enum correctamente
      if (usuario.rol) {
        usuario.rol = Rol[usuario.rol as keyof typeof Rol];
      }
      this.usuarioActual.next(usuario);
<<<<<<< Updated upstream
      this.estaAuth.next(true);
    }
  }

  login(correo: string, contrasena: string) {
    return this.http.post<{ token: string, rol: string }>(
      `${this.baseUrl}/auth/login`,
      { correo, contrasena }
    );
=======
      this.estaAutenticado.next(true);
    }
>>>>>>> Stashed changes
  }

  iniciarSesion(usuario: Usuario) {
    console.log('Usuario que inicia sesión:', usuario);
    console.log('Rol del usuario:', usuario.rol);
    // Asegurarnos de que el rol se convierte al enum correctamente
    if (typeof usuario.rol === 'string') {
      usuario.rol = Rol[usuario.rol as keyof typeof Rol];
    }
    this.usuarioActual.next(usuario);
    this.estaAutenticado.next(true);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  obtenerUsuarioActual(): Observable<Usuario | null> {
    return this.usuarioActual.asObservable();
  }
  
  cerrarSesion() {
    this.usuarioActual.next(null);
<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes

import { Rol } from './enums';

export interface Usuario {
  id?: string;
  dni?: string;
  nombre?: string;
  apellidos?: string;
  correo: string;
  contrasena?: string;
  telefono?: string;
  rol: Rol;
}

export interface UsuarioSession {
  correo: string;
  rol: Rol;
}

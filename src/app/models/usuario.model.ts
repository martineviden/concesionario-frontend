import {Rol} from './enums'

export class UsuarioModel{
  rol:Rol;
  id:string;
  dni: string;
  nombre:string;
  apellidos: string;
  correo: string;
  contrasena: string;
  telefono: string;

  constructor(
  rol:Rol,
  id:string,
  dni: string,
  nombre:string,
  apellidos: string,
  correo: string,
  contrasena: string,
  telefono: string,
  ){
    this.rol = rol;
    this.id = id;
    this.dni = dni;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.correo = correo;
    this.contrasena = contrasena;
    this.telefono = telefono;
  }



}

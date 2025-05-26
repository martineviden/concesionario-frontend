import { Rol } from "./enums"

export class Usuario {
    id: number;
    dni: string;
    nombre: string;
    apellidos: string;
    correo: string;
    contrasena: string;
    telefono: string;
    rol: Rol;

    constructor(id: number, dni: string, nombre: string, apellidos: string, correo: string, contrasena: string, telefono: string, rol: Rol) {
        this.id = id;
        this.dni = dni;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.contrasena = contrasena;
        this.telefono = telefono;
        this.rol = rol;
    }
}

export class UsuarioModelo {

}
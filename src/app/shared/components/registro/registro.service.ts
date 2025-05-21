import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './registro.model'

@Injectable({
    providedIn: 'root'
})

export class RegistroService {
    constructor(private http: HttpClient) {}

    crearUsuario(usuario: Usuario) {
        return this.http.post('http://localhost:8080/usuarios', usuario, {withCredentials: false})
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './login.model'

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    constructor(private http: HttpClient) {}

    obtenerUsuario(correo: string) {
        return this.http.post<Usuario>('http://localhost:8080/usuarios/correo', { correo }, { withCredentials: false })
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuario } from '../models/login.model';

export interface LoginResponse {
    autenticado: boolean;
    usuario: Usuario | null;
}

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    constructor(private http: HttpClient) {}

    loginUsuario(data: { correo: string; contrasena: string }): Observable<LoginResponse> {
        return this.http.post<LoginResponse>('http://localhost:8080/usuarios/login', data, { withCredentials: false })
    }
}
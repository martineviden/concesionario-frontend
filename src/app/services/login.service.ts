import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuario } from '../models/login.model';
import { Rol } from '../models/enums';

export interface LoginResponse {
    token: string;
    usuario: Usuario;
}

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    constructor(private http: HttpClient) {}

    loginUsuario(data: { correo: string; contrasena: string }): Observable<LoginResponse> {
        return this.http.post<LoginResponse>('http://localhost:8080/auth/login', data, { withCredentials: false })
    }
}
// src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    let headersConfig: any = {};

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }

    // Añadir Content-Type si no está definido y es un método con cuerpo
    if (!req.headers.has('Content-Type') && ['POST', 'PUT', 'PATCH'].includes(req.method)) {
      headersConfig['Content-Type'] = 'application/json';
    }

    const cloned = req.clone({ setHeaders: headersConfig });
    return next.handle(cloned);
  }
}

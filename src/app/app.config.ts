import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // o donde tengas tus rutas definidas
import { JwtInterceptor } from './services/JwtInterceptor.service'; // ajusta ruta si es distinta

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([JwtInterceptor])
    ),
    provideRouter(routes)
  ]
};

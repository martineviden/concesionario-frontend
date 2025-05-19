import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { RegistrarseComponent } from './shared/components/registrarse/registrarse.component';
import { ResenaFormComponent } from './shared/components/resena-form/resena-form.component';
import { VehiculosComponent } from './shared/components/vehiculos/vehiculos.component';
import { ReservaFormComponent } from './shared/components/reserva-form/reserva-form.component';
import { TipoVehiculoComponent } from './shared/components/tipo-vehiculo/tipo-vehiculo.component';
import { MisReservasComponent } from './shared/components/mis-reservas/mis-reservas.component';
import { AdminReservasComponent } from './shared/components/admin-reservas/admin-reservas.component';
import { HomeBannerFirstComponent } from './shared/components/home-banner-first/home-banner-first.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'vehiculos', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registrarse', component: RegistrarseComponent },
  { path: 'vehiculos', component: VehiculosComponent },
  { path: 'tipo-vehiculo/:id', component: TipoVehiculoComponent },
  { path: 'reservar/:matricula', component: ReservaFormComponent },
  { path: 'mis-reservas', component: MisReservasComponent },
  { path: 'admin/reservas', component: AdminReservasComponent },
  { path: 'resena-form', component: ResenaFormComponent},
  { path: 'banner', component: HomeBannerFirstComponent}


];

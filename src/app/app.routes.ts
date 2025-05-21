import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { RegistroComponent } from './shared/components/registro/registro.component';
import { ResenaFormComponent } from './shared/components/resena-form/resena-form.component';
import { VehiculosComponent } from './shared/components/vehiculos/vehiculos.component';
import { ReservaFormComponent } from './shared/components/reserva-form/reserva-form.component';
import { TipoVehiculoComponent } from './shared/components/tipo-vehiculo/tipo-vehiculo.component';
import { MisReservasComponent } from './shared/components/mis-reservas/mis-reservas.component';
import { AdminReservasComponent } from './shared/components/admin-reservas/admin-reservas.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HomeBannerFirstComponent } from './shared/components/home-banner-first/home-banner-first.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { DatoHomeComponent } from './shared/components/dato-home/dato-home.component';
import { HechosHomeComponent } from './shared/components/hechos-home/hechos-home.component';
import { HomeComponent } from './vistas/home/home.component';
import { CatalogoComponent } from './vistas/catalogo/catalogo.component';
import { EspecificacionesComponent } from './vistas/especificaciones/especificaciones.component';

export const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  // // { path: '', redirectTo: 'vehiculos', pathMatch: 'full' }, para que no me redireccione
  { path: 'login', component: LoginComponent },
  { path: 'registrarse', component: RegistroComponent },
  { path: 'vehiculos', component: VehiculosComponent },
  { path: 'tipo-vehiculo/:id', component: TipoVehiculoComponent },
  { path: 'reservar/:matricula', component: ReservaFormComponent },
  { path: 'mis-reservas', component: MisReservasComponent },
  { path: 'admin/reservas', component: AdminReservasComponent },
  { path: 'resena-form', component: ResenaFormComponent},
  { path: 'navbar', component: NavbarComponent},
  { path: '', component: HomeComponent},
  { path: 'catalogo', component: CatalogoComponent},
    {path: 'especificaciones', component: EspecificacionesComponent}

];

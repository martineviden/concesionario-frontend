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
import { HomeComponent } from './vistas/home/home.component';
import { CatalogoComponent } from './vistas/catalogo/catalogo.component';
import { EditarPerfilComponent } from './shared/components/editar-perfil/editar-perfil.component';
import { NosotrosComponent } from './vistas/nosotros/nosotros.component';
import { ContactoComponent } from './vistas/contacto/contacto.component';

import { NosotrosComponent } from './vistas/nosotros/nosotros.component';
import { ContactoComponent } from './vistas/contacto/contacto.component';

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
  { path: '', component: HomeComponent},
  { path: 'catalogo', component: CatalogoComponent},
  { path: 'editar-perfil', component: EditarPerfilComponent},
  { path: 'nosotros', component: NosotrosComponent},
  { path: 'contacto', component: ContactoComponent},
];

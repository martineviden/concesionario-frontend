import { Routes } from '@angular/router';
import { HomeComponent } from './vistas/home/home.component';
import { CatalogoComponent } from './vistas/catalogo/catalogo.component';
import { EditarPerfilComponent } from './shared/components/Perfil/editar-perfil/editar-perfil.component';
import { NosotrosComponent } from './vistas/nosotros/nosotros.component';
import { ContactoComponent } from './vistas/contacto/contacto.component';
import { EspecificacionesComponent } from './vistas/especificaciones/especificaciones.component';
import { PerfilComponent } from './vistas/perfil/perfil.component';
import { RegistroComponent } from './shared/components/Header_Footer/registro/registro.component';
import { LoginComponent } from './shared/components/Header_Footer/login/login.component';
import { PerfilAdministracionComponent } from './shared/components/Perfil/perfil-administracion/perfil-administracion.component';

export const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  // // { path: '', redirectTo: 'vehiculos', pathMatch: 'full' }, para que no me redireccione
  { path: 'login', component: LoginComponent },
  { path: 'registrarse', component: RegistroComponent },
  { path: '', component: HomeComponent},
  { path: 'catalogo', component: CatalogoComponent},
  { path: 'editar-perfil', component: EditarPerfilComponent},
  { path: 'nosotros', component: NosotrosComponent},
  { path: 'contacto', component: ContactoComponent},
  {path: 'especificaciones/:matricula', component: EspecificacionesComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'admin', component: PerfilAdministracionComponent}
];

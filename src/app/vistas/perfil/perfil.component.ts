import { Component } from '@angular/core';
import { PerfilAdminComponent } from "../../shared/components/Perfil/perfil-admin/perfil-admin.component";
import { PerfilAdministracionComponent } from '../../shared/components/Perfil/perfil-administracion/perfil-administracion.component';
import { NavbarComponent } from '../../shared/components/Header_Footer/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/Header_Footer/footer/footer.component';

@Component({
  selector: 'app-perfil',
  imports: [NavbarComponent, FooterComponent, PerfilAdministracionComponent, PerfilAdminComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

}

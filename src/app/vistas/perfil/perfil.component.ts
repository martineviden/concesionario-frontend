import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { PerfilAdminComponent } from "../../shared/components/perfil-admin/perfil-admin.component";
import { PerfilAdministracionComponent } from '../../shared/components/perfil-administracion/perfil-administracion.component';

@Component({
  selector: 'app-perfil',
  imports: [NavbarComponent, FooterComponent, PerfilAdministracionComponent, PerfilAdminComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

}

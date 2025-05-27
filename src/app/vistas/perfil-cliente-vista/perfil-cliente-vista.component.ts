import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { PerfilUsuarioComponent } from '../../shared/components/perfil-usuario/perfil-usuario.component';

@Component({
  selector: 'app-perfil-cliente-vista',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, PerfilUsuarioComponent],
  templateUrl: './perfil-cliente-vista.component.html',
  styleUrl: './perfil-cliente-vista.component.css'
})
export class PerfilClienteVistaComponent {}

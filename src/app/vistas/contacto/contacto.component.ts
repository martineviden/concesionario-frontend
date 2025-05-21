import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { TituloComponent } from "../../shared/components/titulo/titulo.component";
import { ContactoBannerComponent } from "../../shared/components/contacto-banner/contacto-banner.component";
import { DatoContactoComponent } from "../../shared/components/dato-contacto/dato-contacto.component";
import { UltimaPublicacionComponent } from "../../shared/components/ultima-publicacion/ultima-publicacion.component";

@Component({
  selector: 'app-contacto',
  imports: [NavbarComponent, FooterComponent, TituloComponent, ContactoBannerComponent, DatoContactoComponent, UltimaPublicacionComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

}

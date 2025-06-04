import { Component } from '@angular/core';
import { UltimaPublicacionComponent } from "../../shared/components/Contacto/ultima-publicacion/ultima-publicacion.component";
import { FooterComponent } from '../../shared/components/Header_Footer/footer/footer.component';
import { ContactoBannerComponent } from '../../shared/components/Contacto/contacto-banner/contacto-banner.component';
import { DatoContactoComponent } from '../../shared/components/Contacto/dato-contacto/dato-contacto.component';
import { MarcasBlockComponent } from '../../shared/components/Contacto/marcas-block/marcas-block.component';
import { NavbarComponent } from '../../shared/components/Header_Footer/navbar/navbar.component';

@Component({
  selector: 'app-contacto',
  imports: [NavbarComponent, FooterComponent, ContactoBannerComponent, DatoContactoComponent, UltimaPublicacionComponent, MarcasBlockComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

}

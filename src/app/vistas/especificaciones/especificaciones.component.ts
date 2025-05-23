import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { TipoVehiculoBannerFirstComponent } from '../../shared/components/tipo-vehiculo-banner-first/tipo-vehiculo-banner-first.component';
import { TipoVehiculoResennasComponent } from '../../shared/components/tipo-vehiculo-resennas/tipo-vehiculo-resennas.component';
import { PreviewCatalogoComponent } from '../../shared/components/preview-catalogo/preview-catalogo.component';

@Component({
  selector: 'app-especificaciones',
  imports: [FooterComponent, NavbarComponent, TipoVehiculoBannerFirstComponent, TipoVehiculoResennasComponent, PreviewCatalogoComponent],
  templateUrl: './especificaciones.component.html',
  styleUrl: './especificaciones.component.css'
})
export class EspecificacionesComponent {

}

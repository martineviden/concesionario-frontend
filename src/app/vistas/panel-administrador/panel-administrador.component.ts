import { Component } from '@angular/core';
import { AgregarVehiculoComponent } from "../../shared/components/agregar-vehiculo/agregar-vehiculo.component";
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { AgregarTipoVehiculoComponent } from "../../shared/components/agregar-tipo-vehiculo/agregar-tipo-vehiculo.component";

@Component({
  selector: 'app-panel-administrador',
  imports: [AgregarVehiculoComponent, FooterComponent, NavbarComponent, AgregarTipoVehiculoComponent],
  templateUrl: './panel-administrador.component.html',
  styleUrl: './panel-administrador.component.css'
})
export class PanelAdministradorComponent {

}

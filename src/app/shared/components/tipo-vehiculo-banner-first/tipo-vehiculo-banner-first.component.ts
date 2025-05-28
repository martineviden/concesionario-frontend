import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioAlquilarComponent } from "../formulario-alquilar/formulario-alquilar.component";
import { TipoVehiculoModel } from '../../../models/tipo-vehiculo.model';
import { VehiculoModel } from '../../../models/vehiculo.model';

@Component({
  selector: 'app-tipo-vehiculo-banner-first',
  standalone: true,
  imports: [CommonModule, FormularioAlquilarComponent],
  templateUrl: './tipo-vehiculo-banner-first.component.html',
  styleUrls: ['./tipo-vehiculo-banner-first.component.css']
})
export class TipoVehiculoBannerFirstComponent {
  mostrarFormularioAlquilar = false;
  @Input() vehiculo!: VehiculoModel;
  @Input() tipoVehiculo!: TipoVehiculoModel;
}
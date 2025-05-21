import { Component, inject, OnInit } from '@angular/core';

import { TipoVehiculoService } from './home-banner-first.service';
import { TipoVehiculo } from './home-banner-first.model';
import { Vehiculo } from './tipoVehiculo';


@Component({
  selector: 'app-home-banner-first',
  imports: [],
  templateUrl: './home-banner-first.component.html',
  styleUrl: './home-banner-first.component.css'
})

export class HomeBannerFirstComponent implements OnInit{

  private tipoVehiculoService = inject(TipoVehiculoService);
  private id: number = 2;

  private nuevoVehiculo: TipoVehiculo = {
    id: 6,
    precio: 6000,
    marca: "Honda",
    modelo: "Civic",
    imagen:"/jaoidjaoi.jpg",
    tipo: Vehiculo.COCHE
  }

  ngOnInit(): void {
    this.tipoVehiculoService.create(this.nuevoVehiculo).subscribe(tipoVehiculoService => { console.log(tipoVehiculoService) });
  }

}

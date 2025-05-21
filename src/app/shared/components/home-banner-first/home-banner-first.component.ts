import { Component, inject, OnInit } from '@angular/core';

<<<<<<< HEAD
import { TipoVehiculoService } from './home-banner-first.service';
import { TipoVehiculo } from './home-banner-first.model';
import { Vehiculo } from './tipoVehiculo';
=======
import {TipoCocheServce} from '../../../services/tipo-vehiculo.service'
import { TipoVehiculoClase } from '../../../models/tipo-vehiculo.model';
import { TipoVehiculo } from '../../../models/enums';
>>>>>>> definicion_servicios


@Component({
  selector: 'app-home-banner-first',
  imports: [],
  templateUrl: './home-banner-first.component.html',
  styleUrl: './home-banner-first.component.css'
})

export class HomeBannerFirstComponent implements OnInit{

  private tipoVehiculoService = inject(TipoVehiculoService);
  private id: number = 2;

<<<<<<< HEAD
  private nuevoVehiculo: TipoVehiculo = {
    id: 6,
=======
  private nuevoCoche:TipoVehiculoClase ={
    id : 6,
>>>>>>> definicion_servicios
    precio: 6000,
    marca: "Honda",
    modelo: "Civic",
    imagen:"/jaoidjaoi.jpg",
    tipo: Vehiculo.COCHE
  }

<<<<<<< HEAD
  ngOnInit(): void {
    this.tipoVehiculoService.create(this.nuevoVehiculo).subscribe(tipoVehiculoService => { console.log(tipoVehiculoService) });
  }
=======

   ngOnInit(): void {
       this.tipoCocheServce.list()
        .subscribe(tipoCoches=>{
      console.log(tipoCoches)
        });

      //this.tipoCocheServce.create(this.nuevoCoche).subscribe(tipoCocheServce=>{console.log()});
   }
>>>>>>> definicion_servicios

}

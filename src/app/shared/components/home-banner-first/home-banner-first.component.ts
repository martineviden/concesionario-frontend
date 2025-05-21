import { Component, inject, OnInit } from '@angular/core';

import {TipoVehiculoService} from '../../../services/tipo-vehiculo.service'
import { TipoVehiculoModel } from '../../../models/tipo-vehiculo.model';
import { TipoVehiculo } from '../../../models/enums';


@Component({
  selector: 'app-home-banner-first',
  imports: [],
  templateUrl: './home-banner-first.component.html',
  styleUrl: './home-banner-first.component.css'
})

export class HomeBannerFirstComponent implements OnInit{

  private tipoVehiculoService = inject(TipoVehiculoService);
  private id: number = 2;

  private nuevoCoche:TipoVehiculoModel ={
    id : 6,
    precio: 6000,
    marca: "Honda",
    modelo: "Civic",
    imagen:"/jaoidjaoi.jpg",
    tipo: TipoVehiculo.COCHE
  }


   ngOnInit(): void {
      //  this.tipoCocheServce.list()
      //   .subscribe(tipoCoches=>{
      // console.log(tipoCoches)
      //   });

      //this.tipoCocheServce.create(this.nuevoCoche).subscribe(tipoCocheServce=>{console.log()});
   }

}

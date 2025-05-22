import { Component, inject, OnInit } from '@angular/core';

import {TipoVehiculoService} from '../../../services/tipo-vehiculo.service'
import { TipoVehiculoModel } from '../../../models/tipo-vehiculo.model';
import { Provincia, TipoVehiculo } from '../../../models/enums';
import { CommonModule, NgFor } from '@angular/common';


@Component({
  selector: 'app-home-banner-first',
  imports: [],
  templateUrl: './home-banner-first.component.html',
  styleUrl: './home-banner-first.component.css'
})

export class HomeBannerFirstComponent implements OnInit{

  private tipoVehiculoService = inject(TipoVehiculoService);
  private id: number = 2;
  tipoCOCHE = TipoVehiculo.keys();
  ubicaciones = Provincia.keys();

  private nuevoCoche:TipoVehiculoModel ={
    id : 6,
    precio: 6000,
    marca: "Honda",
    modelo: "Civic",
    imagen:"/jaoidjaoi.jpg",
    tipo: TipoVehiculo.COCHE,
    vehiculo: "A78546-B"
  }


   ngOnInit(): void {
        this.tipoVehiculoService.listAllTipoVheculo()
         .subscribe(tipoCoches=>{

         console.log(tipoCoches)
         });

      //this.tipoCocheServce.create(this.nuevoCoche).subscribe(tipoCocheServce=>{console.log()});
      console.log(this.tipoCOCHE);
   }



}

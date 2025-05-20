import { Component, inject, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';

import {TipoCocheServce} from './home-banner-first.service'
import { TipoCoche } from './home-banner-first.model';
import { TipoVehiculo } from './TipoVehiculo';


@Component({
  selector: 'app-home-banner-first',
  imports: [],
  templateUrl: './home-banner-first.component.html',
  styleUrl: './home-banner-first.component.css'
})

export class HomeBannerFirstComponent implements OnInit{

  private tipoCocheServce = inject(TipoCocheServce);
  private id:number =2;

  private nuevoCoche:TipoCoche ={
    id : 6,
    precio: 6000,
    marca: "Honda",
    modelo : "Civic",
    imagen :"/jaoidjaoi.jpg",
    tipo:TipoVehiculo.COCHE



  }


   ngOnInit(): void {
      //  this.tipoCocheServce.get(this.id)
      //  .subscribe(tipoCoches=>{
      //   console.log(tipoCoches)
      //  });

      this.tipoCocheServce.create(this.nuevoCoche).subscribe(tipoCocheServce=>{console.log()});
   }

}

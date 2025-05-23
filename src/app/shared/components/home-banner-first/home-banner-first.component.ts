import { Component, inject, OnInit } from '@angular/core';

import {TipoVehiculoService} from '../../../services/tipo-vehiculo.service'
import { TipoVehiculoModel } from '../../../models/tipo-vehiculo.model';
import { Provincia, TipoVehiculo } from '../../../models/enums';
import { CommonModule, NgFor } from '@angular/common';
import { VehiculoService } from '../../../services/vehiculo.service';
import { VehiculoModel } from '../../../models/vehiculo.model';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-home-banner-first',
  imports: [ReactiveFormsModule],
  templateUrl: './home-banner-first.component.html',
  styleUrl: './home-banner-first.component.css'
})

export class HomeBannerFirstComponent implements OnInit{

   private tipoVehiculoService = inject(TipoVehiculoService);
   private tipoUbicacion = inject(VehiculoService);
  //private tipo_ubicacion = inject(VehiculoService);
  // private tipoVeh = inject(VehiculoModel);
  // private tipoVeh2 = inject(TipoVehiculoModel).modelo;
  // private id: number = 2;
   tiposVheiculo = TipoVehiculo.keys();
   tiposVheiculoCoche = TipoVehiculo.COCHE;
   ubicaciones = Provincia.keys();
   ubicacionMadrid= Provincia.MADRID;

  form: FormGroup;

  private tipoVheiculoSeleccionado!:TipoVehiculo;
  private ubicacionSeleccionado!:Provincia;

  constructor(private formBuilder: FormBuilder){
    this.form = this.formBuilder.group({
      tiposVheiculo:[""],
      ubicaciones:[""],

    });
  }
  get fields():FormArray{
    return this.form.get("fields") as FormArray;
  }
  submitForm(){
    console.log(this.form.value);
  }


  // private tipoVehiculo = inject(TipoVehiculoModel).tipo.COCHE
  // private ubicacion = inject(VehiculoModel).ubicacion



  // private nuevoCoche:TipoVehiculoModel ={
  //   id : 6,
  //   precio: 6000,
  //   marca: "Honda",
  //   modelo: "Civic",
  //   imagen:"/jaoidjaoi.jpg",
  //   tipo: TipoVehiculo.COCHE,
  //   vehiculo: "A78546-B"
  // }


   ngOnInit(): void {
        // this.tipoVehiculoService.listAllTipoVheculo()
        //  .subscribe(tipoCoches=>{

        //  console.log(tipoCoches)
        //  });

      //this.tipoCocheServce.create(this.nuevoCoche).subscribe(tipoCocheServce=>{console.log()});

      // this.tipo_ubicacion.buscarPorTipoUbicacion(this.tiposVheiculoCoche,this.ubicacionMadrid)
     // this.tipoUbicacion.buscarPorTipoUbicacion(this.tiposVheiculoCoche,this.ubicacionMadrid).subscribe(tipoUbicacion=>{console.log(tipoUbicacion)})


   }
   onbuscar(){
    this.tipoUbicacion.buscarPorTipoUbicacion(this.tipoVheiculoSeleccionado,this.ubicacionSeleccionado).subscribe(tipoUbicacion=>{console.log(tipoUbicacion)})
   }






}

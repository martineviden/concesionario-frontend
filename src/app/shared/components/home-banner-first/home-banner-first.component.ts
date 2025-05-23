import { Component, inject, NgModule, type OnInit } from "@angular/core"
import {TipoVehiculoService} from '../../../services/tipo-vehiculo.service'
import { Provincia, TipoVehiculo } from '../../../models/enums';
import { VehiculoService } from '../../../services/vehiculo.service';
import { FormArray, FormBuilder, FormGroup, FormsModule, NgControlStatus, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { TipoVehiculoModel } from '../../../models/tipo-vehiculo.model';
import { VehiculoModel } from '../../../models/vehiculo.model';
@Component({
  selector: 'app-home-banner-first',
  imports: [ReactiveFormsModule,FormsModule, CommonModule],
  templateUrl: './home-banner-first.component.html',
  styleUrl: './home-banner-first.component.css'
})


export class HomeBannerFirstComponent implements OnInit{

   //private tipoVehiculoService = inject(TipoVehiculoService);
private tipoUbicacion = inject(VehiculoService);


  formTipoUbicacion: FormGroup;
  tiposVheiculo = TipoVehiculo.keys();

  ubicaciones = Provincia.keys();

  constructor(private fb: FormBuilder){
    this.formTipoUbicacion = this.fb.group({
      selectedOptionV: [
        this.tiposVheiculo[0],
      ],
      selectedOptionU:[
        this.ubicaciones[0],
      ]
    });
  }


   submit(){

    //console.log('Selected Value VEHICULO:', this.formTipoUbicacion.value.selectedOptionV+' Selected Value ubicacion:',this.formTipoUbicacion.value.selectedOptionU);

     this.tipoUbicacion.buscarPorTipoUbicacion(this.formTipoUbicacion.value.selectedOptionV,this.formTipoUbicacion.value.selectedOptionU)

       .subscribe(tipoUbicacion=>{
        if(tipoUbicacion==0){
          console.log("No hay vehiculo en esta ubicacion")
        }else{
          console.log(tipoUbicacion)
        }
       });

       }

ngOnInit(): void {



   }
   }












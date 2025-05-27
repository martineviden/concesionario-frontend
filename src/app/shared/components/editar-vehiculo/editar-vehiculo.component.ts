import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {TipoVehiculo,Provincia,Combustible,Transmision,EtiquetaAmbiental} from '../../../models/enums';
import { from } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VehiculoModel } from '../../../models/vehiculo.model';


@Component({
  selector: 'app-editar-vehiculo',
  imports: [CommonModule],
  templateUrl: './editar-vehiculo.component.html',
  styleUrl: './editar-vehiculo.component.css'
})

// 1* Traer los enums.
// 2* Traer modelo Vheiculo y Tipo de Vheiculo.
// 3* Traer servicio vehiculo
// 4* crear formularios dinamicos
// 5* recoger datos de formulario
// 6* enviar datos al back
// 7* Dar respuesta si se ha creado correctamente o no.

// Vemos que necesitaremos para crear el modelo
 /*matricula: string;
  color: string;
  kilometraje: number;
  disponibilidad: boolean;
  ubicacion: Provincia;
  combustible: Combustible;
  etiqueta: EtiquetaAmbiental;
  autonomia: number;
  puertas: number;
  aireAcondicionado: boolean;
  plazas: number;
  transmision: Transmision;
  tipoV: VehiculoModel;
*/
export class EditarVehiculoComponent {
  @Output() closeModal = new EventEmitter<void>();
  
// Definimos las variables necesarias
/*
  color!: VehiculoModel;
  kilometraje!: VehiculoModel;
  disponibilidad!: VehiculoModel;
  ubicacion!: Provincia;
  combustible!: Combustible;
  etiqueta!: EtiquetaAmbiental;
  autonomia!: VehiculoModel;
  puertas!: VehiculoModel;
  aireAcondicionado!: VehiculoModel;
  plazas!: VehiculoModel;
  transmision!: Transmision;
  tipoV!: TipoVehiculo;



//Creamos el formulario
newVheculoForm: FormGroup;
  constructor( private fb:FormBuilder){
    this.newVheculoForm = this.fb.group({
      //Definicion de FormcontrolNames
      selectOptionVheiculo:[
        this.tipoV[0],
      ],

    })
  }
*/

 close() {
    this.closeModal.emit();
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {TipoVehiculo,Provincia,Combustible,Transmision,EtiquetaAmbiental} from '../../../models/enums';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehiculoModel } from '../../../models/vehiculo.model';
import { TipoVehiculoModel } from '../../../models/tipo-vehiculo.model';
import { VehiculoService } from '../../../services/vehiculo.service';


@Component({
  selector: 'app-editar-vehiculo',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
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


export class EditarVehiculoComponent {

  @Output() closeModal = new EventEmitter<void>();

 close(){
    this.closeModal.emit();
  }
//  mostrarModulo: boolean = true;


// // Definimos las variables necesarias
  private crearVehiculoService = inject(VehiculoService);


  color!: VehiculoModel;
  kilometraje!: VehiculoModel;
  //disponibilidad!: VehiculoModel;
  ubicacion= Provincia.keys();
  combustible= Combustible.keys();
  etiquetaAmbiental = EtiquetaAmbiental.keys();
  autonomia!: VehiculoModel;
  puertas!: VehiculoModel;
  aireAcondicionado!: VehiculoModel;
  plazas!: VehiculoModel;
  transmision= Transmision.keys();
  tipoV = TipoVehiculo.keys();
  matricula!:TipoVehiculoModel;
  modelo!: TipoVehiculoModel;
  precio!: TipoVehiculoModel;
  imagen!: TipoVehiculoModel

//Creamos el formulario

newVheculoForm: FormGroup;
newVheiculoDatos!: VehiculoModel;
  constructor( private fb:FormBuilder){
    this.newVheculoForm = this.fb.group({
      //Definicion de FormcontrolNamesselect
      matricula:[""],
      color:[""],
      kilometraje:[""],
      disponibilidad:true,
      selectTipoUbicacion:[
        this.ubicacion[0]
      ],
      selectTipoCombustible:[
        this.combustible[0]
      ],
      selectTipoEtiqueta:[
        this.etiquetaAmbiental[0]
      ],
      autonomia:[""],
      puertas:[""],
      aireAcondicionado:true,
      plazas:[""],
      selectTipoTransmision:[
        this.transmision[0]
      ],
      marca:[""],
      modelo:[''],
      precio:[""],
       selectTipoVheiculo:[
        this.tipoV[0]
      ],
      id:[8],
      imagen:["unaImagen"],
      reservas:[[]]

    });


  }
crearVheiculo(){
  const datosFormulario = this.newVheculoForm.value;
  const valuesFormulario: VehiculoModel = datosFormulario;
  this.newVheiculoDatos={
      matricula: this.newVheculoForm.value.matricula,
      color: this.newVheculoForm.value.color,
      kilometraje: this.newVheculoForm.value.kilometraje,
      disponibilidad: this.newVheculoForm.value.disponibilidad,
      ubicacion: this.newVheculoForm.value.selectTipoUbicacion,
      combustible: this.newVheculoForm.value.selectTipoCombustible,
      etiqueta: this.newVheculoForm.value.selectTipoEtiqueta,
      autonomia: this.newVheculoForm.value.autonomia,
      puertas: this.newVheculoForm.value.autonomia,
      aireAcondicionado: this.newVheculoForm.value.aireAcondicionado,
      plazas: this.newVheculoForm.value.plazas,
      transmision: this.newVheculoForm.value.selectTipoTransmision,
      marca: this.newVheculoForm.value.marca,
      //modelo: this.newVheculoForm.value.modelo,
      //precio: this.newVheculoForm.value.precio,
      //tipoVheiculo: this.newVheculoForm.value.selectTipoVheiculo,
      //id_tipo_vehiculo: this.newVheculoForm.value.id,
     // imagen: this.newVheculoForm.value.imagen,
      reservas :this.newVheculoForm.value.reservas,
     }
    this.crearVehiculoService.createVhiculo(this.newVheiculoDatos)
    .subscribe({
      next: res=> console.log('Vheiculo creado',res),
      error: err=> console.error('Error al crar vheiculo',err)
    });
    console.log(this.newVheiculoDatos);
    console.log(valuesFormulario);
    this.close();
  }

}


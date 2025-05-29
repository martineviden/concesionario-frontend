import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {TipoVehiculo,Provincia,Combustible,Transmision,EtiquetaAmbiental} from '../../../models/enums';
import { filter, from } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehiculoModel } from '../../../models/vehiculo.model';
import { TipoVehiculoModel } from '../../../models/tipo-vehiculo.model';
import { VehiculoService } from '../../../services/vehiculo.service';
import { TipoVehiculoService } from '../../../services/tipo-vehiculo.service';


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

// Crear tipo vheiculo. Rescatar tipo vheiculo, servir tipo vheiculo, crear vheiculo. Hacer el get de tipo vheiculos?
// 1* Crear tipo de Vheiculo.
// 2* Ver todos tipos Vheiculos.
// 3* Crear Vheiculo en base a id_ tipo vheculo id- as nombre marca tal vez.
// 4* Ver todos vheiculo
// 5* todo correspondiente al update y eliminacion


export class EditarVehiculoComponent implements OnInit{

  @Output() closeModal = new EventEmitter<void>();

 close(){
    this.closeModal.emit();
  }
//  mostrarModulo: boolean = true;


// // Definimos las variables necesarias
  private crearVehiculoService = inject(VehiculoService);
  private rescatarTipoVheculo = inject(TipoVehiculoService);

  color!: VehiculoModel;
  kilometraje!: VehiculoModel;
  disponibilidad!: VehiculoModel;
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
  tipoVehiculosList: any[] = [];





//Creamos el formulario

newVheculoForm: FormGroup;
newVheiculoDatos!: VehiculoModel;



  constructor( private fb:FormBuilder){
    //Formulario crear vheiculo
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
      selectmarca:[

      ],
      selectModelo:[
        //[this.tipoVehiculos["modelo[0]"]]
      ],
      precio:[""],
       selectTipoVheiculo:[
        this.tipoV[0]
      ],
      // select_id_tipovheiculo:[
      //   this.datosTodosVheicolos.id[0]
      // ],
      imagen:["unaImagen"],
      reservas:[[]]

    });



  }




   rescatarTipoVheculos():void{
      this.rescatarTipoVheculo.listAllTipoVheculo().subscribe((tipos:any)=>{
        this.tipoVehiculosList=tipos
      });



  }
  ngOnInit(): void {
    //this.rescatarTipoVheculos();







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
      modelo: this.newVheculoForm.value.modelo,
      precio: this.newVheculoForm.value.precio,
      tipoVheiculo: this.newVheculoForm.value.selectTipoVheiculo,
      id_tipo_vehiculo: this.newVheculoForm.value.id,
      imagen: this.newVheculoForm.value.imagen,
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

// this.tipoVehiculos =tipos;
//       console.log([this.tipoVehiculos])
//       for(let i in this.tipoVehiculos){
//           this.tipoVehiculos[i]
//       }
//         console.log(this.tipoVehiculos[0].id);
//         for(let i = 0; i< this.tipoVehiculos.length;i++){
//           const ids = this.tipoVehiculos[i].id
//           console.log(ids)
//         }
//         for(let i = 0; i< this.tipoVehiculos.length;i++){
//            const marca = this.tipoVehiculos[i].marca
//           console.log(marca)
//         }
//         for(let i = 0; i< this.tipoVehiculos.length;i++){

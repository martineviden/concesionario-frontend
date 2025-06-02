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

// Para crear el vheiculo nos hace falta id_tipo de vheiculo principalmente. Seguramente haycrar un servicio que reciba id
export class EditarVehiculoComponent implements OnInit{

  @Output() closeModal = new EventEmitter<void>();

 close(){
    this.closeModal.emit();
  }



// // Definimos las variables necesarias
  private crearVehiculoService = inject(VehiculoService);
  private rescatarTipoVheculo = inject(TipoVehiculoService);

  // Aqui recibo todos tipos vheiculos
  tipoVehiculosList: any[] = [];
  tipoVehiculoByID: any;
  //marca:any;
  tipos_ubicacion=Provincia.keys();
  tipos_transmision=Transmision.keys();
  tipos_combustible=Combustible.keys();
  tipos_etiqueta = EtiquetaAmbiental.keys();




//Creamos el formulario

newVheculoForm: FormGroup;
newVheiculoDatos!: VehiculoModel;
//recuperacionId: FormGroup;



  constructor( private fb:FormBuilder){
    //Formulario crear vheiculo
    this.newVheculoForm = this.fb.group({
      //Definicion de FormcontrolNamesselect.Le servire directamente las ociones
      id:[""],
      marca:[""],
      modelo:[""],
      precio:[""],
      tipo:[""],
      imagen:[""],
      ubicacion:[""],

       matricula: [""],
       color: [""],
        //marca:[null],
        kilometraje: [],
        disponibilidad: [],
        combustible: [""],
        etiqueta: [""],
        autonomia: [""],
        puertas: [],
        aireAcondicionado: [],
        plazas: [],
        transmision: [],
        reservas: [[""]]

    });





  }



   rescatarTipoVheculos():void{
      this.rescatarTipoVheculo.listAllTipoVehiculo().subscribe((tipos:any)=>{
        this.tipoVehiculosList=tipos
      });

  }
buscarTipoVehicoloID():void{
  const datoFormularioID= this.newVheculoForm.value;
  console.log(datoFormularioID);
  const id:TipoVehiculoModel["id"] = datoFormularioID.id;
      this.rescatarTipoVheculo.getOneTipoVheculo(id)
      .subscribe((tipos:any)=>{
        this.tipoVehiculoByID=tipos;
        console.log(this.tipoVehiculoByID);


      });

    }



  ngOnInit(): void {
    this.rescatarTipoVheculos();
    //console.log(this.tipoVehiculosList);






}

crearVheiculo(){
  const datosFormulario = this.newVheculoForm.value;
  const valuesFormulario: VehiculoModel = datosFormulario;
  console.log(valuesFormulario);
    this.crearVehiculoService.createVehiculo(valuesFormulario)
    .subscribe({
      next: res=> console.log('Vheiculo creado',res),
      error: err=> console.error('Error al crar vheiculo',err)
    });
    //console.log(this.newVheiculoDatos);
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
//this.newVheiculoDatos={
      // matricula: this.newVheculoForm.value.matricula,
      // color: this.newVheculoForm.value.color,
      // kilometraje: this.newVheculoForm.value.kilometraje,
      // disponibilidad: this.newVheculoForm.value.disponibilidad,
      // ubicacion: this.newVheculoForm.value.selectTipoUbicacion,
      // combustible: this.newVheculoForm.value.selectTipoCombustible,
      // etiqueta: this.newVheculoForm.value.selectTipoEtiqueta,
      // autonomia: this.newVheculoForm.value.autonomia,
      // puertas: this.newVheculoForm.value.autonomia,
      // aireAcondicionado: this.newVheculoForm.value.aireAcondicionado,
      // plazas: this.newVheculoForm.value.plazas,
      // transmision: this.newVheculoForm.value.selectTipoTransmision,
      // marca: this.newVheculoForm.value.marca,
      // modelo: this.newVheculoForm.value.modelo,
      // precio: this.newVheculoForm.value.precio,
      // tipoVheiculo: this.newVheculoForm.value.selectTipoVheiculo,
      // id_tipo_vehiculo: this.newVheculoForm.value.id,
      // imagen: this.newVheculoForm.value.imagen,
      // reservas :this.newVheculoForm.value.reservas,
     //}

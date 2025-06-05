import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {TipoVehiculo,Provincia,Combustible,Transmision,EtiquetaAmbiental} from '../../../models/enums';
import { filter, from } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehiculoModel } from '../../../models/vehiculo.model';
import { TipoVehiculoModel } from '../../../models/tipo-vehiculo.model';
import { VehiculoService } from '../../../services/vehiculo.service';
import { TipoVehiculoService } from '../../../services/tipo-vehiculo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
// 5* todo correspondiente al update y eliminacion->Dentro de la tabla ya

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



  constructor( private fb:FormBuilder,private snackBar: MatSnackBar){
    //Formulario crear vheiculo
    this.newVheculoForm = this.fb.group({
      //Definicion de FormcontrolNamesselect.Le servire directamente las ociones
      tipoVehiculo:[{id:[""]}],

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
        reservas: [[]]

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
  const id:TipoVehiculoModel["id"] = datoFormularioID.tipoVehiculo
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

crearVheiculo() {
  const datosFormulario = this.newVheculoForm.value;

  const vehiculo: VehiculoModel = {
    ...datosFormulario,
    tipoVehiculo: { id: parseInt(datosFormulario.tipoVehiculo) }, //  Corrige aquí: usa el campo correcto del formulario
    reservas: []
  };

  console.log('Vehículo antes de enviar:', JSON.stringify(vehiculo, null, 2));

  this.crearVehiculoService.createVehiculo(vehiculo).subscribe({
    next: res => {
      console.log(' Vehículo creado:', res);
      this.openSnackBar("Vehiculo creado con exito");
      this.close();
    },
    error: err => console.error(' Error al crear vehículo:', err)
  });
}

//-------Mensajería
openSnackBar(mensaje:string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }

}

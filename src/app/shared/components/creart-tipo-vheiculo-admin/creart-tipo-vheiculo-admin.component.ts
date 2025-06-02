import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TipoVehiculoService } from '../../../services/tipo-vehiculo.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TipoVehiculo } from '../../../models/enums';
import { TipoVehiculoModel, TipoVehiculoSinVhiculosModel } from '../../../models/tipo-vehiculo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creart-tipo-vheiculo-admin',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './creart-tipo-vheiculo-admin.component.html',
  styleUrl: './creart-tipo-vheiculo-admin.component.css'
})





export class CreartTipoVheiculoAdminComponent {

@Output() closeModal = new EventEmitter<void>();

 close(){
    this.closeModal.emit();
  }
//----Variables
private crearTipoVheiculoSinVheculo= inject(TipoVehiculoService);
newTipoVheiculoForm!: FormGroup;
tipoV = TipoVehiculo.keys();

//---Constructor
constructor(private forBuildetTipoVheiculo:FormBuilder ){
  // Crecion de Formulario
    this.newTipoVheiculoForm = this.forBuildetTipoVheiculo.group({
        marca: [""],
        modelo: [""],
        precio: [],
        tipo: [
          this.tipoV[0]
        ],
        imagen: [""],
        vehiculos: []
    });
}

crearTipoVheiculo():void{
      const datosFormularioTipoVhiculo = this.newTipoVheiculoForm.value;
      const valuesTipoFormulario: TipoVehiculoSinVhiculosModel = datosFormularioTipoVhiculo;
      console.log(valuesTipoFormulario)
      this.crearTipoVheiculoSinVheculo.createOneTipoVheculoSinVheiculo(valuesTipoFormulario)
      .subscribe({
        next: res=>{
          console.log("Se ha creado el tipo vheiculo",res)
        },
        error: err=>{
          console.log("Han habido problemas con el post",err)
        }
      });
      this.close();
    }




}

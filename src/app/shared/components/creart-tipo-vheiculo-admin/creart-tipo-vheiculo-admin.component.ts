import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TipoVehiculoService } from '../../../services/tipo-vehiculo.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TipoVehiculo } from '../../../models/enums';
import { TipoVehiculoModel, TipoVehiculoSinVhiculosModel } from '../../../models/tipo-vehiculo.model';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

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
constructor(private forBuildetTipoVheiculo:FormBuilder, private snackBar: MatSnackBar){
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
          this.openSnackBar("Se ha creado el tipo vheiculo con exito");
          console.log("Se ha creado el tipo vheiculo",res)
        },
        error: err=>{
          console.log("Han habido problemas con el post",err);
          this.openSnackBar("Han habido problemas para crear el tipo vhiculo");
        }
      });
      this.close();
    }
// Mensajería
  openSnackBar(mensaje:string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }



}

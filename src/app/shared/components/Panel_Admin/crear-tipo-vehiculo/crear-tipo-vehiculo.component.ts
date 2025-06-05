import { Component, EventEmitter, Output } from '@angular/core';
import { TipoVehiculoService } from '../../../../services/tipo-vehiculo.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipoVehiculo } from '../../../../models/enums';
import { TipoVehiculoModel} from '../../../../models/tipo-vehiculo.model';
import { CommonModule } from '@angular/common';
import { enumValues } from '../../../../utils/enum-utils';

@Component({
  selector: 'app-crear-tipo-vehiculo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-tipo-vehiculo.component.html',
  styleUrl: './crear-tipo-vehiculo.component.css'
})


export class CrearTipoVehiculoComponent {

@Output() closeModal = new EventEmitter<void>();

// Variables
newTipoVehiculoForm!: FormGroup;
tipoV = enumValues(TipoVehiculo);
isLoading = false;
showSuccessMessage = false;
showErrorMessage = false;
errorMessage = '';

// Constructor
constructor(private forBuildetTipoVheiculo:FormBuilder, private tipoVehiculoService: TipoVehiculoService){
  // Creacion de Formulario
    this.newTipoVehiculoForm = this.forBuildetTipoVheiculo.group({
      marca: ["", [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/), Validators.maxLength(30)]],
      modelo: ["", [Validators.required, Validators.maxLength(40)]],
      precio: ["", [Validators.required, Validators.min(0.5)]],
      tipo: ["", Validators.required],
      imagen: ["", Validators.required]
    });
}

  crearTipoVehiculo():void{
     if (this.newTipoVehiculoForm.invalid) {
      this.newTipoVehiculoForm.markAllAsTouched();
      this.showErrorMessage = true;
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
      return;
    }

    this.isLoading = true;
    this.showErrorMessage = false;
    this.showSuccessMessage = false;

    const formData = this.newTipoVehiculoForm.value;

    // Create a simple object that matches backend expectations
    const tipoData = {
      marca: formData.marca,
      modelo: formData.modelo,
      precio: formData.precio,
      tipo: formData.tipo,
      imagen: formData.imagen
    };

    console.log('Enviando datos del tipo vehículo:', tipoData);

    this.tipoVehiculoService.createTipoVehiculo(tipoData).subscribe({
      next: (res) => {
        console.log('Tipo de vehículo creado exitosamente:', res);
        this.isLoading = false;
        this.showSuccessMessage = true;
        this.newTipoVehiculoForm.reset();
        setTimeout(() => {
          this.close();
        }, 1500);
      },
      error: (err) => {
        console.error('Error al crear tipo vehículo:', err);
        this.isLoading = false;
        this.showErrorMessage = true;
        this.errorMessage = err.error?.message || 'Error al crear el tipo de vehículo. Intente nuevamente.';
      },
    });
  }

  preventNegative(event: KeyboardEvent): void {
    if (event.key === '-' || event.key === 'e') {
      event.preventDefault();
    }
  }


close(){
  this.closeModal.emit();
}

}

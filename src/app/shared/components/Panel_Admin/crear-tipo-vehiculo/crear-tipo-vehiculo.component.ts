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

// Constructor
constructor(private forBuildetTipoVheiculo:FormBuilder, private tipoVehiculoService: TipoVehiculoService){
  // Crecion de Formulario
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
      return;
    }

    const formData = this.newTipoVehiculoForm.value;

    const nuevoTipo = new TipoVehiculoModel(
      0, // El ID será asignado por el backend
      formData.precio,
      formData.marca,
      formData.modelo,
      formData.imagen,
      formData.tipo,
      [] // Lista de vehículos vacía al crear
    );

    this.tipoVehiculoService.createTipoVehiculo(nuevoTipo).subscribe({
      next: (res) => {
        console.log('Se ha creado el tipo vehículo:', res);
        this.close();
      },
      error: (err) => {
        console.error('Error al crear tipo vehículo:', err);
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

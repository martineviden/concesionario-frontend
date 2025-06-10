import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Provincia, Transmision, Combustible, EtiquetaAmbiental } from '../../../../models/enums';
import { enumValues } from '../../../../utils/enum-utils';
import { VehiculoModel } from '../../../../models/vehiculo.model';

@Component({
  selector: 'app-editar-vehiculo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-vehiculo.component.html',
  styleUrls: ['./editar-vehiculo.component.css']
})
export class EditarVehiculoComponent implements OnInit {
  @Input() vehiculo!: { vehiculo: VehiculoModel};
  @Output() closeModal = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<VehiculoModel>();
  @Output() onDelete = new EventEmitter<void>();

  newVehiculoForm!: FormGroup;

  provincias = enumValues(Provincia);
  combustibles = enumValues(Combustible);
  transmisiones = enumValues(Transmision);
  etiquetas = enumValues(EtiquetaAmbiental);
  colores: string[] = ['Gris', 'Blanco', 'Negro', 'Plateado', 'Rojo', 'Azul', 'Amarillo', 'Naranja'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('🚗 EditarVehiculoComponent abierto con:', this.vehiculo);
    this.initForm();

    if (this.vehiculo) {
      this.newVehiculoForm.patchValue(this.vehiculo.vehiculo);
    }
  }

  initForm(): void {
    this.newVehiculoForm = this.fb.group({
      matricula: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^[A-Za-z0-9\- ]+$/)
      ]],
      tipoVehiculo: [null, Validators.required],
      color: ['', Validators.required],
      kilometraje: [0, [Validators.required, Validators.min(0)]],
      disponibilidad: [false],
      ubicacion: ['', Validators.required],
      combustible: ['', Validators.required],
      etiqueta: ['', Validators.required],
      autonomia: [0, [Validators.required, Validators.min(0)]],
      puertas: [5, [Validators.required, Validators.min(2), Validators.max(5)]],
      aireAcondicionado: [false],
      plazas: [5, [Validators.required, Validators.min(2), Validators.max(9)]],
      transmision: ['', Validators.required]
    });
  }

  guardar(): void {
    if (this.newVehiculoForm.valid) {
      const vehiculoEditado: VehiculoModel = {
        ...this.newVehiculoForm.value,
        matricula: this.vehiculo?.vehiculo?.matricula, // Mantener la matrícula original
        tipoVehiculo: this.vehiculo?.vehiculo?.tipoVehiculo // Mantener el tipo original
      };

      console.log('Datos a guardar:', vehiculoEditado);
      this.onSave.emit(vehiculoEditado);
    } else {
      console.log('Formulario inválido');
      this.newVehiculoForm.markAllAsTouched();
    }
  }

  eliminar(): void {
    if (confirm('¿Estás seguro de que deseas eliminar este tipo de vehículo?')) {
      this.onDelete.emit();
    }
  }

  close(): void {
    this.closeModal.emit();
  }

  preventNegative(event: KeyboardEvent): void {
    if (event.key === '-' || event.key === '+') {
      event.preventDefault();
    }
  }
}

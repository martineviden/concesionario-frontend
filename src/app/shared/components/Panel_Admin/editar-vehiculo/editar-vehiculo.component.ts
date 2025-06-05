import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoVehiculoModel } from '../../../../models/tipo-vehiculo.model';
import { Provincia, Transmision, Combustible, EtiquetaAmbiental } from '../../../../models/enums';
import { enumValues } from '../../../../utils/enum-utils';

@Component({
  selector: 'app-editar-vehiculo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-vehiculo.component.html',
  styleUrls: ['./editar-vehiculo.component.css']
})
export class EditarVehiculoComponent implements OnInit {
  @Input() tipo!: TipoVehiculoModel;
  @Output() closeModal = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<TipoVehiculoModel>();
  @Output() onDelete = new EventEmitter<void>();

  newVehiculoForm!: FormGroup;

  provincias = enumValues(Provincia);
  combustibles = enumValues(Combustible);
  transmisiones = enumValues(Transmision);
  etiquetas = enumValues(EtiquetaAmbiental);
  colores: string[] = ['Gris', 'Blanco', 'Negro', 'Plateado', 'Rojo', 'Azul', 'Amarillo', 'Naranja'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();

    if (this.tipo) {
      this.newVehiculoForm.patchValue(this.tipo);
    }
  }

  initForm(): void {
    this.newVehiculoForm = this.fb.group({
      id: [this.tipo?.id ?? '', Validators.required],
      ubicacion: ['', Validators.required],
      transmision: ['', Validators.required],
      combustible: ['', Validators.required],
      puertas: [5, [Validators.required, Validators.min(2), Validators.max(5)]],
      plazas: [5, [Validators.required, Validators.min(2), Validators.max(9)]],
      autonomia: [0, [Validators.required, Validators.min(0)]],
      etiqueta: ['', Validators.required],
      matricula: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^[A-Za-z0-9\- ]+$/)
      ]],
      color: ['', Validators.required],
      kilometraje: [0, [Validators.required, Validators.min(0)]],
      disponibilidad: [false]
    });
  }

  guardar(): void {
    if (this.newVehiculoForm.valid) {
      const vehiculoEditado: TipoVehiculoModel = this.newVehiculoForm.value;
      this.onSave.emit(vehiculoEditado);
    } else {
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

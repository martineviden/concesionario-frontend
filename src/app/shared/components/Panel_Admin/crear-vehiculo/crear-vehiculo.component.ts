import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TipoVehiculoService } from '../../../../services/tipo-vehiculo.service';
import { Combustible, EtiquetaAmbiental, Provincia, Transmision } from '../../../../models/enums';
import { enumValues } from '../../../../utils/enum-utils';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { VehiculoModel } from '../../../../models/vehiculo.model';

@Component({
  selector: 'app-crear-vehiculo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-vehiculo.component.html',
  styleUrls: ['./crear-vehiculo.component.css']
})
export class CrearVehiculoComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();

  newVehiculoForm: FormGroup;

  tipoVehiculosList: any[] = [];
  tipoVehiculoByID: any;

  provincias = enumValues(Provincia);
  combustibles = enumValues(Combustible);
  transmisiones = enumValues(Transmision);
  etiquetas = enumValues(EtiquetaAmbiental);

  constructor(
    private fb: FormBuilder,
    private rescatarTipoVheculo: TipoVehiculoService, private vehiculoService: VehiculoService) {
    this.newVehiculoForm = this.fb.group({
      id: ['', Validators.required],
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

  ngOnInit(): void {
    this.rescatarTipoVheculo.getTiposVehiculo().subscribe((tipos: any[]) => {
      this.tipoVehiculosList = tipos;
    });
  }

  onTipoVehiculoChange(): void {
    const id = this.newVehiculoForm.value.id;
    if (id) {
      this.rescatarTipoVheculo.getTipoVehiculoById(id).subscribe((tipo: any) => {
        this.tipoVehiculoByID = tipo;
      });
    } else {
      this.tipoVehiculoByID = null;
    }
  }

  crearVehiculo(): void {
    if (this.newVehiculoForm.invalid) {
      this.newVehiculoForm.markAllAsTouched();
      return;
    }

    const formData = this.newVehiculoForm.value;
    const nuevoTipo = new VehiculoModel(
      0, // El ID será asignado por el backend
      formData.ubicacion,
      formData.transmision,
      formData.combustible,
      formData.puertas,
      formData.plazas,
      formData.autonomia,
      formData.etiqueta,
      formData.matricula,
      formData.color,
      formData.kilometraje,
      this.tipoVehiculoByID, // Asignar el tipo de vehículo seleccionado
      formData.disponibilidad,
      this.tipoVehiculoByID?.id // id_tipo_vehiculo
    );

    console.log('Creando vehículo:', formData);

    this.vehiculoService.createVehiculo(nuevoTipo).subscribe({
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

  close(): void {
    this.closeModal.emit();
  }
}

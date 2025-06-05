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
  isLoading = false;
  showSuccessMessage = false;
  showErrorMessage = false;
  errorMessage = '';

  provincias = enumValues(Provincia);
  combustibles = enumValues(Combustible);
  transmisiones = enumValues(Transmision);
  etiquetas = enumValues(EtiquetaAmbiental);
  colores = [
    'Rojo', 'Azul', 'Verde', 'Negro', 'Blanco', 'Amarillo', 'Naranja', 
    'Morado', 'Rosa', 'Gris', 'Marrón', 'Plateado', 'Dorado'
  ];

  constructor(
    private fb: FormBuilder,
    private rescatarTipoVheculo: TipoVehiculoService, private vehiculoService: VehiculoService) {
    this.newVehiculoForm = this.fb.group({
      id: ['', Validators.required],
      ubicacion: ['', Validators.required],
      transmision: ['', Validators.required],
      combustible: ['', Validators.required],
      puertas: [2, [Validators.required, Validators.min(2), Validators.max(5)]],
      plazas: [2, [Validators.required, Validators.min(2), Validators.max(9)]],
      autonomia: [0, [Validators.required, Validators.min(0)]],
      etiqueta: ['', Validators.required],
      matricula: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^[A-Za-z0-9\- ]+$/)
      ]],
      color: ['', Validators.required],
      kilometraje: [0, [Validators.required, Validators.min(0)]],
      aireAcondicionado: [false],
      disponibilidad: [true]
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
  }  crearVehiculo(): void {
    if (this.newVehiculoForm.invalid) {
      this.newVehiculoForm.markAllAsTouched();
      this.showErrorMessage = true;
      this.errorMessage = 'Por favor, complete todos los campos requeridos correctamente.';
      return;
    }

    this.isLoading = true;
    this.showErrorMessage = false;
    this.showSuccessMessage = false;

    const formData = this.newVehiculoForm.value;
    
    // Create the vehicle object to match backend expectations
    const vehiculoData = {
      matricula: formData.matricula,
      tipoVehiculo: {
        id: formData.id
      },
      color: formData.color,
      kilometraje: formData.kilometraje,
      disponibilidad: formData.disponibilidad,
      ubicacion: formData.ubicacion,
      combustible: formData.combustible,
      etiqueta: formData.etiqueta,
      autonomia: formData.autonomia,
      puertas: formData.puertas,
      aireAcondicionado: formData.aireAcondicionado,
      plazas: formData.plazas,
      transmision: formData.transmision
    };

    console.log('Enviando datos del vehículo:', vehiculoData);

    this.vehiculoService.createVehiculo(vehiculoData).subscribe({
      next: (res) => {
        console.log('Vehículo creado exitosamente:', res);
        this.isLoading = false;
        this.showSuccessMessage = true;
        this.newVehiculoForm.reset();
        setTimeout(() => {
          this.close();
        }, 1500);
      },
      error: (err) => {
        console.error('Error al crear vehículo:', err);
        this.isLoading = false;
        this.showErrorMessage = true;
        this.errorMessage = err.error?.message || 'Error al crear el vehículo. Intente nuevamente.';
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

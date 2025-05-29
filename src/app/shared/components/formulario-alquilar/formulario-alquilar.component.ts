import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculoModel } from '../../../models/vehiculo.model';
import { TipoVehiculoModel } from '../../../models/tipo-vehiculo.model';

@Component({
  selector: 'app-formulario-alquilar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-alquilar.component.html',
  styleUrls: ['./formulario-alquilar.component.css']
})
export class FormularioAlquilarComponent implements OnInit {
  @Output() cerrarModal = new EventEmitter<void>();
  @Input() vehiculo!: VehiculoModel;
  @Input() tipoVehiculo!: TipoVehiculoModel;
  alquilerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.alquilerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      dni: ['', Validators.required],
      dniIgualCarnet: [false],
      calle: ['', Validators.required],
      numero: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      localidad: ['', Validators.required],
      metodoPago: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Verificar que las entradas estén definidas
    if (!this.vehiculo) {
      console.warn('Vehículo no definido en FormularioAlquilarComponent');
      this.vehiculo = {} as VehiculoModel;
    }
    if (!this.tipoVehiculo) {
      console.warn('TipoVehículo no definido en FormularioAlquilarComponent');
      this.tipoVehiculo = {} as TipoVehiculoModel;
    }
    console.log('Vehículo recibido:', this.vehiculo);
    console.log('TipoVehículo recibido:', this.tipoVehiculo);
  }

  cerrar() {
    this.cerrarModal.emit();
  }
}
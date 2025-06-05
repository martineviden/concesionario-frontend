import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculoModel } from '../../../models/vehiculo.model';
import { TipoVehiculoModel } from '../../../models/tipo-vehiculo.model';
import { ReservaService } from '../../../services/reserva.service';
import { ReservaModel } from '../../../models/reserva.model';

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

  constructor(private fb: FormBuilder, private reservaService: ReservaService) {
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
      metodoPago: ['', Validators.required],
      fechaReserva: ['', Validators.required],
      diasReserva: [1, [Validators.required, Validators.min(1)]]
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

  confirmarReserva(){
    // si el usuario no esta registrado que se registre
    const usuarioId= '';
    const vehiculoMatricula = this.vehiculo.matricula;

    const reserva = new ReservaModel(
      vehiculoMatricula,
      usuarioId,
      new Date(this.alquilerForm.value.fechaReserva),
      this.alquilerForm.value.diasReserva,
      this.tipoVehiculo.precio * this.alquilerForm.value.diasReserva,
      '' // el id se genera en el backend
    );

    this.reservaService.createReserva(reserva).subscribe({
      next: () =>{
        alert('Reserva realizada con éxito');
        this.cerrar();
      },
      error: err => {
        console.error('Error al crear la reserva', err);
        alert('Ocurrió un error al hacer la reserva')
      }
    })
  }
}


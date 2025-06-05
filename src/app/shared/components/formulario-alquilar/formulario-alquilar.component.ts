import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculoModel } from '../../../models/vehiculo.model';
import { TipoVehiculoModel } from '../../../models/tipo-vehiculo.model';
import { ReservaService } from '../../../services/reserva.service';
import { ReservaModel } from '../../../models/reserva.model';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../models/login.model';

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
  usuarioActual: Usuario | null = null;
  precioTotal: number = 0;

  constructor(
    private fb: FormBuilder, 
    private reservaService: ReservaService,
    private authService: AuthService
  ) {
    this.alquilerForm = this.fb.group({
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

    // Obtener usuario actual
    this.authService.obtenerUsuarioActual().subscribe(usuario => {
      this.usuarioActual = usuario;
    });

    // Calcular precio inicial
    this.calcularPrecioTotal();

    // Escuchar cambios en días de reserva para actualizar precio
    this.alquilerForm.get('diasReserva')?.valueChanges.subscribe(() => {
      this.calcularPrecioTotal();
    });

    console.log('Vehículo recibido:', this.vehiculo);
    console.log('TipoVehículo recibido:', this.tipoVehiculo);
  }

  calcularPrecioTotal() {
    const dias = this.alquilerForm.get('diasReserva')?.value || 1;
    this.precioTotal = (this.tipoVehiculo?.precio || 0) * dias;
  }

  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  cerrar() {
    this.cerrarModal.emit();
  }
  confirmarReserva(){
    if (this.alquilerForm.invalid) {
      this.alquilerForm.markAllAsTouched();
      return;
    }

    if (!this.usuarioActual) {
      console.error('Usuario no autenticado');
      return;
    }

    const fechaReserva = new Date(this.alquilerForm.value.fechaReserva);
    const diasReserva = this.alquilerForm.value.diasReserva;
    const precio = this.precioTotal;    const reserva = new ReservaModel(
      this.vehiculo.matricula,
      this.usuarioActual.id.toString(),
      fechaReserva,
      diasReserva,
      precio,
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


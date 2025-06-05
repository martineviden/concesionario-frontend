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
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder, 
    private reservaService: ReservaService,
    private authService: AuthService
  ) {
    this.alquilerForm = this.fb.group({
      fechaReserva: ['', Validators.required],
      diasReserva: [1, [Validators.required, Validators.min(1), Validators.max(30)]]
    });
  }ngOnInit() {
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

  incrementDays() {
    const currentValue = this.alquilerForm.get('diasReserva')?.value || 1;
    if (currentValue < 30) {
      this.alquilerForm.get('diasReserva')?.setValue(currentValue + 1);
    }
  }

  decrementDays() {
    const currentValue = this.alquilerForm.get('diasReserva')?.value || 1;
    if (currentValue > 1) {
      this.alquilerForm.get('diasReserva')?.setValue(currentValue - 1);
    }
  }

  cerrar() {
    this.cerrarModal.emit();
  }
  confirmarReserva() {
    if (this.alquilerForm.invalid) {
      this.alquilerForm.markAllAsTouched();
      return;
    }

    if (!this.usuarioActual) {
      console.error('Usuario no autenticado');
      alert('Debes estar autenticado para realizar una reserva');
      return;
    }

    this.isLoading = true;

    // Preparar los datos de la reserva en el formato correcto para el backend
    const fechaReservaString = this.alquilerForm.value.fechaReserva; // Ya está en formato YYYY-MM-DD
    const diasReserva = Number(this.alquilerForm.value.diasReserva); // Asegurar conversión a número
    const precio = Number(this.precioTotal.toFixed(2)); // Asegurar que es un número decimal con 2 decimales

    // Validar que los datos sean válidos
    if (!fechaReservaString || isNaN(diasReserva) || isNaN(precio) || diasReserva < 1) {
      console.error('Datos de reserva inválidos:', { fechaReservaString, diasReserva, precio });
      alert('Por favor, verifica que todos los datos sean correctos.');
      this.isLoading = false;
      return;
    }

    // Crear el objeto de reserva con la estructura que espera el backend
    const reservaData = {
      vehiculo: {
        matricula: this.vehiculo.matricula
      },
      usuario: {
        id: this.usuarioActual.id
      },
      fechaReserva: fechaReservaString,
      diasReserva: diasReserva,
      precio: precio
    };

    console.log('Datos de reserva a enviar:', JSON.stringify(reservaData, null, 2));

    this.reservaService.createReserva(reservaData).subscribe({
      next: (response) => {
        console.log('Reserva creada exitosamente:', response);
        this.isLoading = false;
        alert('¡Reserva realizada con éxito! Te contactaremos pronto para confirmar los detalles.');
        this.cerrar();
      },
      error: (err) => {
        console.error('Error al crear la reserva:', err);
        this.isLoading = false;
        
        let errorMessage = 'Ocurrió un error al procesar tu reserva. ';
        
        if (err.error && err.error.message) {
          errorMessage += err.error.message;
        } else if (err.status === 400) {
          errorMessage += 'Por favor, verifica que todos los datos sean correctos.';
        } else if (err.status === 0) {
          errorMessage += 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
        } else {
          errorMessage += 'Inténtalo de nuevo más tarde.';
        }
        
        alert(errorMessage);
      }
    });
  }
}


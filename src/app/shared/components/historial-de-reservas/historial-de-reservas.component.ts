import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../../services/reserva.service';

@Component({
  selector: 'app-historial-de-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-de-reservas.component.html',
  styleUrl: './historial-de-reservas.component.css'
})
export class HistorialDeReservasComponent implements OnInit {
  @Input() idUsuario: string | number | null = null;
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  reservas: any[] = [];
  reservasFiltradas: any[] = [];
  cargando = true;
  filtro: 'recientes' | 'antiguos' = 'recientes';

  constructor(private reservaService: ReservaService) {}

  ngOnInit() {
    // Incluimos la lógica para obtener las reservas del usuario actual
    if (this.idUsuario) {
      this.reservaService.listAllReserva().subscribe((data: any) => {
        console.log('Reservas recibidas:', data); // Log para ver la respuesta del backend
        if (data.length > 0) {
          console.log('Primera reserva:', data[0]); // Log para ver la estructura de la primera reserva
        }
        // Mostramos todas las reservas sin filtrar (solo para pruebas)
        this.reservas = data;
        console.log('Reservas mostradas (sin filtrar):', this.reservas);
        this.aplicarFiltro();
        this.cargando = false;
      }, () => {
        this.cargando = false;
      });
    } else {
      this.cargando = false;
    }
  }

  aplicarFiltro() {
    // Incluimos el filtrado por fecha
    if (this.filtro === 'recientes') {
      this.reservasFiltradas = [...this.reservas].sort((a, b) => new Date(b.fecha_reserva).getTime() - new Date(a.fecha_reserva).getTime());
    } else {
      this.reservasFiltradas = [...this.reservas].sort((a, b) => new Date(a.fecha_reserva).getTime() - new Date(b.fecha_reserva).getTime());
    }
  }

  cambiarFiltro(filtro: 'recientes' | 'antiguos') {
    this.filtro = filtro;
    this.aplicarFiltro();
  }

  cerrar() {
    this.close.emit();
  }
}

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../../services/reserva.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historial-de-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historial-de-reservas.component.html',
  styleUrl: './historial-de-reservas.component.css'
})
export class HistorialDeReservasComponent implements OnInit {
  @Input() show = false;
  @Input() idUsuario!: number;
  @Output() close = new EventEmitter<void>();

  reservas: any[] = [];
  reservasFiltradas: any[] = [];
  filtroMatricula: string = '';
  filtroFecha: string = '';
  ordenFecha: string = 'reciente';

  constructor(private reservaService: ReservaService) {}

  ngOnInit() {
    this.cargarReservas();
  }

  cargarReservas() {
    console.log('ID usuario recibido:', this.idUsuario);
    this.reservaService.getReservasByUsuario(this.idUsuario).subscribe((res: any) => {
      this.reservas = res;
      this.reservasFiltradas = [...this.reservas];
      this.aplicarFiltros();
    });
  }

  aplicarFiltros() {
    let filtradas = this.reservas.filter(r => {
      const matricula = r.vehiculo?.matricula || '';
      return !this.filtroMatricula || matricula.includes(this.filtroMatricula);
    });
    filtradas = filtradas.sort((a, b) => {
      const fechaA = new Date(a.fechaReserva).getTime();
      const fechaB = new Date(b.fechaReserva).getTime();
      return this.ordenFecha === 'reciente' ? fechaB - fechaA : fechaA - fechaB;
    });
    this.reservasFiltradas = filtradas;
  }

  limpiarFiltros() {
    this.filtroMatricula = '';
    this.ordenFecha = 'reciente';
    this.aplicarFiltros();
  }

  cerrar() {
    this.close.emit();
  }
}

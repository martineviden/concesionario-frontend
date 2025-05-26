import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-editar-vehiculo',
  imports: [CommonModule],
  templateUrl: './editar-vehiculo.component.html',
  styleUrl: './editar-vehiculo.component.css'
})
export class EditarVehiculoComponent {
  mostrarModulo: boolean = true;

  cerrarModal() {
    this.mostrarModulo = false;
  }
}

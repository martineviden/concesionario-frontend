import { Component } from '@angular/core';
declare var bootstrap: any;
@Component({
  selector: 'app-agregar-tipo-vehiculo',
  imports: [],
  templateUrl: './agregar-tipo-vehiculo.component.html',
  styleUrl: './agregar-tipo-vehiculo.component.css'
})
export class AgregarTipoVehiculoComponent {
tipoSeleccionado: string | null = null;

  seleccionarTipo(tipo: string) {
    this.tipoSeleccionado = tipo;
    
    const modalEditarVehiculo = document.getElementById('modalVehiculo');
    if (modalEditarVehiculo) {
      const modal = new bootstrap.Modal(modalEditarVehiculo);
      modal.show();
    }
    
  }
}

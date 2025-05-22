import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-formulario-alquilar',
  standalone: true,
  templateUrl: './formulario-alquilar.component.html',
  styleUrls: ['./formulario-alquilar.component.css']
})
export class FormularioAlquilarComponent {
  @Output() cerrarModal = new EventEmitter<void>();
}

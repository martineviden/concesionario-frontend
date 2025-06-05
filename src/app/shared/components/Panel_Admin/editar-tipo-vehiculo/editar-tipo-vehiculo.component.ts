import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoVehiculoModel } from '../../../../models/tipo-vehiculo.model';
import { enumValues } from '../../../../utils/enum-utils';
import { TipoVehiculo } from '../../../../models/enums';

@Component({
  selector: 'app-editar-tipo-vehiculo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-tipo-vehiculo.component.html',
  styleUrls: ['./editar-tipo-vehiculo.component.css']
})
export class EditarTipoVehiculoComponent implements OnInit {
  @Input() tipo!: TipoVehiculoModel;
  @Output() closeModal = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<TipoVehiculoModel>();
  @Output() onDelete = new EventEmitter<void>();

  tipoEditado!: TipoVehiculoModel;
  tiposVehiculo = enumValues(TipoVehiculo);

  ngOnInit(): void {
    // Clonamos para evitar mutaciones hasta que se guarde
    this.tipoEditado = { ...this.tipo };
  }

  guardar(): void {
    this.onSave.emit(this.tipoEditado);
  }

  eliminar(): void {
    if (confirm('¿Estás seguro de que deseas eliminar este tipo de vehículo?')) {
      this.onDelete.emit();
    }
  }

  close(){
    this.closeModal.emit();
  }
  
}


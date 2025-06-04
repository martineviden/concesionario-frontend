import { Component, inject, OnInit } from "@angular/core";
import { TipoVehiculo } from '../../../../models/enums';
import { Provincia } from '../../../../models/enums';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-home-banner-first',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MatFormFieldModule, MatSelectModule, MatButtonModule ],
  templateUrl: './home-banner-first.component.html',
  styleUrl: './home-banner-first.component.css'
})
export class HomeBannerFirstComponent implements OnInit {

  formTipoUbicacion: FormGroup;
  tiposVehiculo = TipoVehiculo.keys();
  ubicaciones = Provincia.keys();

  constructor(private fb: FormBuilder, private router: Router,  private snackBar: MatSnackBar) {
    this.formTipoUbicacion = this.fb.group({
      selectedOptionV: [null],
      selectedOptionU: [null]
    });
  }

  submit() {
    const tipo = this.formTipoUbicacion.value.selectedOptionV;
    const ubicacion = this.formTipoUbicacion.value.selectedOptionU;

    if (!tipo || !ubicacion) {
      this.showWarn();
      return;
    }

    this.router.navigate(['/catalogo'], {
      queryParams: {
        tipo,
        ubicacion
      }
    });
  }

  showWarn() {
  this.snackBar.open('❌ Por favor selecciona ambos campos requeridos', 'CERRAR', {
    duration: 5000,
    panelClass: ['custom-snackbar'],
    horizontalPosition: 'center',
    verticalPosition: 'top',
    politeness: 'assertive',
    data: {
      icon: 'warning',
      preClose: () => { /* Acción antes de cerrar */ }
    }
  });
}

  ngOnInit(): void {}
}

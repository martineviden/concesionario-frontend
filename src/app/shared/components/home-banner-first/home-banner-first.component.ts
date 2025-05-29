import { Component, inject, OnInit } from "@angular/core";
import { TipoVehiculo } from '../../../models/enums';
import { Provincia } from '../../../models/enums';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-banner-first',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './home-banner-first.component.html',
  styleUrl: './home-banner-first.component.css'
})
export class HomeBannerFirstComponent implements OnInit {

  formTipoUbicacion: FormGroup;
  tiposVheiculo = TipoVehiculo.keys();
  ubicaciones = Provincia.keys();

  constructor(private fb: FormBuilder, private router: Router) {
    this.formTipoUbicacion = this.fb.group({
      selectedOptionV: [this.tiposVheiculo[0]],
      selectedOptionU: [this.ubicaciones[0]]
    });
  }

  submit() {
    const tipo = this.formTipoUbicacion.value.selectedOptionV;
    const ubicacion = this.formTipoUbicacion.value.selectedOptionU;

    this.router.navigate(['/catalogo'], {
      queryParams: {
        tipo,
        ubicacion
      }
    });
  }

  ngOnInit(): void {}
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoVehiculoComponent } from './agregar-tipo-vehiculo.component';

describe('AgregarTipoVehiculoComponent', () => {
  let component: AgregarTipoVehiculoComponent;
  let fixture: ComponentFixture<AgregarTipoVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarTipoVehiculoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTipoVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

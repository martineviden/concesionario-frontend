import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreartTipoVheiculoAdminComponent } from './crear-tipo-vehiculo.component';

describe('CreartTipoVheiculoAdminComponent', () => {
  let component: CreartTipoVheiculoAdminComponent;
  let fixture: ComponentFixture<CreartTipoVheiculoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreartTipoVheiculoAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreartTipoVheiculoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

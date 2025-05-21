import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoVehiculoResennasComponent } from './tipo-vehiculo-resennas.component';

describe('TipoVehiculoResennasComponent', () => {
  let component: TipoVehiculoResennasComponent;
  let fixture: ComponentFixture<TipoVehiculoResennasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoVehiculoResennasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoVehiculoResennasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialDeReservasComponent } from './historial-de-reservas.component';

describe('HistorialDeReservasComponent', () => {
  let component: HistorialDeReservasComponent;
  let fixture: ComponentFixture<HistorialDeReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialDeReservasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialDeReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntaFrecuenteComponent } from './pregunta-frecuente.component';

describe('PreguntaFrecuenteComponent', () => {
  let component: PreguntaFrecuenteComponent;
  let fixture: ComponentFixture<PreguntaFrecuenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreguntaFrecuenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreguntaFrecuenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

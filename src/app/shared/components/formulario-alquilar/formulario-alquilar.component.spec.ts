import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAlquilarComponent } from './formulario-alquilar.component';

describe('FormularioAlquilarComponent', () => {
  let component: FormularioAlquilarComponent;
  let fixture: ComponentFixture<FormularioAlquilarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioAlquilarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioAlquilarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

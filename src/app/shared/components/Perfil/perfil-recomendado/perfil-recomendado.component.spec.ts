import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilRecomendadoComponent } from './perfil-recomendado.component';

describe('PerfilRecomendadoComponent', () => {
  let component: PerfilRecomendadoComponent;
  let fixture: ComponentFixture<PerfilRecomendadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilRecomendadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilRecomendadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

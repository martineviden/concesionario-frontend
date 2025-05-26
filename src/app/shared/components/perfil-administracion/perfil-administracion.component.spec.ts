import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAdministracionComponent } from './perfil-administracion.component';

describe('PerfilAdministracionComponent', () => {
  let component: PerfilAdministracionComponent;
  let fixture: ComponentFixture<PerfilAdministracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilAdministracionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

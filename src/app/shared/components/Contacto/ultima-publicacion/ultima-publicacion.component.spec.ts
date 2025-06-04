import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimaPublicacionComponent } from './ultima-publicacion.component';

describe('UltimaPublicacionComponent', () => {
  let component: UltimaPublicacionComponent;
  let fixture: ComponentFixture<UltimaPublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UltimaPublicacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UltimaPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

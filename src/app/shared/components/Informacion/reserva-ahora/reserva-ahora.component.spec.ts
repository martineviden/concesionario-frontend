import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaAhoraComponent } from './reserva-ahora.component';

describe('ReservaAhoraComponent', () => {
  let component: ReservaAhoraComponent;
  let fixture: ComponentFixture<ReservaAhoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaAhoraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaAhoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

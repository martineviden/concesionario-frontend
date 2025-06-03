import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionNosotrosComponent } from './seccion-nosotros.component';

describe('SeccionNosotrosComponent', () => {
  let component: SeccionNosotrosComponent;
  let fixture: ComponentFixture<SeccionNosotrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionNosotrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionNosotrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

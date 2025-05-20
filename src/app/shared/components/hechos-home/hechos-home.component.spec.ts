import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HechosHomeComponent } from './hechos-home.component';

describe('HechosHomeComponent', () => {
  let component: HechosHomeComponent;
  let fixture: ComponentFixture<HechosHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HechosHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HechosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatoHomeComponent } from './dato-home.component';

describe('DatoHomeComponent', () => {
  let component: DatoHomeComponent;
  let fixture: ComponentFixture<DatoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatoHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

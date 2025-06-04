import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcasBlockComponent } from './marcas-block.component';

describe('MarcasBlockComponent', () => {
  let component: MarcasBlockComponent;
  let fixture: ComponentFixture<MarcasBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcasBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcasBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

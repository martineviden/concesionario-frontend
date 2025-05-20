import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCatalogoComponent } from './preview-catalogo.component';

describe('PreviewCatalogoComponent', () => {
  let component: PreviewCatalogoComponent;
  let fixture: ComponentFixture<PreviewCatalogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewCatalogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

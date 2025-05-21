import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoComponentComponent } from './catalogo-component.component';

describe('CatalogoComponentComponent', () => {
  let component: CatalogoComponentComponent;
  let fixture: ComponentFixture<CatalogoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

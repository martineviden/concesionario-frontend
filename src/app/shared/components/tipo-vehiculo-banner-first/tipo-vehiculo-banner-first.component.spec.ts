import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoVehiculoBannerFirstComponent } from './tipo-vehiculo-banner-first.component';

describe('TipoVehiculoBannerFirstComponent', () => {
  let component: TipoVehiculoBannerFirstComponent;
  let fixture: ComponentFixture<TipoVehiculoBannerFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoVehiculoBannerFirstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoVehiculoBannerFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

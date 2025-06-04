import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoBannerComponent } from './contacto-banner.component';

describe('ContactoBannerComponent', () => {
  let component: ContactoBannerComponent;
  let fixture: ComponentFixture<ContactoBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactoBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactoBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

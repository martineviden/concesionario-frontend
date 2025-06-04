import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBannerFirstComponent } from './home-banner-first.component';

describe('HomeBannerFirstComponent', () => {
  let component: HomeBannerFirstComponent;
  let fixture: ComponentFixture<HomeBannerFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeBannerFirstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBannerFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

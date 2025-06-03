import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoNosotrosComponent } from './video-nosotros.component';

describe('VideoNosotrosComponent', () => {
  let component: VideoNosotrosComponent;
  let fixture: ComponentFixture<VideoNosotrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoNosotrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoNosotrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

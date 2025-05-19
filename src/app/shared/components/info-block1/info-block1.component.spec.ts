import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBlock1Component } from './info-block1.component';

describe('InfoBlock1Component', () => {
  let component: InfoBlock1Component;
  let fixture: ComponentFixture<InfoBlock1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoBlock1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoBlock1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

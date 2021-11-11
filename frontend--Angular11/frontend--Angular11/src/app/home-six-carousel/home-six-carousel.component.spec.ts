import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSixCarouselComponent } from './home-six-carousel.component';

describe('HomeSixCarouselComponent', () => {
  let component: HomeSixCarouselComponent;
  let fixture: ComponentFixture<HomeSixCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSixCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSixCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

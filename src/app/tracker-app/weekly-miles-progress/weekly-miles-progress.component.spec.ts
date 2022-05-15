import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyMilesProgressComponent } from './weekly-miles-progress.component';

describe('WeeklyMilesProgressComponent', () => {
  let component: WeeklyMilesProgressComponent;
  let fixture: ComponentFixture<WeeklyMilesProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyMilesProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyMilesProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

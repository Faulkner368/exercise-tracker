import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalProgressStatComponent } from './goal-progress-stat.component';

describe('GoalProgressStatComponent', () => {
  let component: GoalProgressStatComponent;
  let fixture: ComponentFixture<GoalProgressStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalProgressStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalProgressStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

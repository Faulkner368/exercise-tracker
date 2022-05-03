import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DailyMileageStatComponent } from './daily-mileage-stat.component';

describe('DailyMileageStatComponent', () => {
  let component: DailyMileageStatComponent;
  let fixture: ComponentFixture<DailyMileageStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyMileageStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyMileageStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MileCountStatComponent } from './mile-count-stat.component';

describe('MileCountStatComponent', () => {
  let component: MileCountStatComponent;
  let fixture: ComponentFixture<MileCountStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MileCountStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MileCountStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

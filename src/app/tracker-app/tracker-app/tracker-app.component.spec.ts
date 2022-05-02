import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackerAppComponent } from './tracker-app.component';

describe('TrackerAppComponent', () => {
  let component: TrackerAppComponent;
  let fixture: ComponentFixture<TrackerAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackerAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExerciseModalComponent } from './add-exercise-modal.component';

describe('AddExerciseComponent', () => {
  let component: AddExerciseModalComponent;
  let fixture: ComponentFixture<AddExerciseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExerciseModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExerciseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExerciseModalComponent } from './edit-exercise-modal.component';

describe('EditExerciseModalComponent', () => {
  let component: EditExerciseModalComponent;
  let fixture: ComponentFixture<EditExerciseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExerciseModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExerciseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

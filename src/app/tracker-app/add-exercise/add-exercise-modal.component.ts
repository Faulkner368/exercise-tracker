import { Component, EventEmitter, Output } from '@angular/core';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ExerciseSession } from '../models/exercise-session.model';
import { TrackerService } from '../tracker.service';

@Component({
  selector: 'et-add-exercise-modal',
  templateUrl: './add-exercise-modal.component.html',
  styleUrls: ['./add-exercise-modal.component.scss']
})
export class AddExerciseModalComponent {
  @Output() public created = new EventEmitter<boolean>();
  public payload: ExerciseSession = new ExerciseSession();
  public icons: any = {
    windowClose: faWindowClose,
  };

  public get datePickerConfig(): any {
    return { containerClass: 'theme-blue', dateInputFormat: 'DD/MM/YYYY' };
  }

  constructor(
    public bsModalRef: BsModalRef,
    public trackerService: TrackerService
    ) { }

  public addExercise(): void {
    this.trackerService.addExercise(this.payload);

    this.created.emit(true);
    this.bsModalRef.hide();
  }

  public onDateChange(event: any): void {
    this.payload.date = new Date(event);
  }
}

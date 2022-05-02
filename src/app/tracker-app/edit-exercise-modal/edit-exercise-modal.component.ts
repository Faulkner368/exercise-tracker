import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ExerciseSession } from '../models/exercise-session.model';
import { TrackerService } from '../tracker.service';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
import * as lodash from 'lodash';
const _ = lodash;

@Component({
  selector: 'et-edit-exercise-modal',
  templateUrl: './edit-exercise-modal.component.html',
  styleUrls: ['./edit-exercise-modal.component.scss']
})
export class EditExerciseModalComponent implements OnInit {
  @Input() public exercise: ExerciseSession;
  @Output() public edited = new EventEmitter<boolean>();
  public payload: ExerciseSession;
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

  public ngOnInit(): void  {
    this.payload = _.cloneDeep(this.exercise);
    this.temporaryDate = this.payload.date;
  }

  public get lodashConst(): lodash.LoDashStatic {
    return _;
  }

  public saveChanges(): void {
    if (!_.isEqual(this.payload, this.exercise)) {
    this.trackerService.saveExercise(this.payload);
    this.edited.emit(true);
    }

    this.bsModalRef.hide();
  }

  public temporaryDate: Date;
  public onDateChange(event: any): void {
    const parseDate = new Date(event);
    if (parseDate) this.payload.date = new Date(event);
    else console.error(`Invalid date: ${parseDate}`);
  }
}

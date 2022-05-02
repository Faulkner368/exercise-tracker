import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { EditExerciseModalComponent } from '../edit-exercise-modal/edit-exercise-modal.component';
import { ExerciseSession } from '../models/exercise-session.model';
import { TrackerService } from '../tracker.service';

@Component({
  selector: 'et-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent {
  @Input() public exercise: ExerciseSession;
  @Output() public onDelete = new EventEmitter<ExerciseSession>();
  @Output() public onEdit = new EventEmitter<boolean>();
  public icons: any = {
    eye: faEye,
    bin: faTrash
  };

  constructor(
    private trackerService: TrackerService,
    private modalService: BsModalService
    ) {}

  public deleteExercise(): void {
    const confirmationText: string = `Are you sure you wish to delete "${this.exercise.label}" ?`;

    const confirmDeleteModal = this.modalService.show(ConfirmModalComponent, {
			initialState: {
				confirmationText: confirmationText
			},
			ignoreBackdropClick: true
		});

		confirmDeleteModal.content?.confirmed.subscribe({
      next: (confirmed: boolean) => {
        if (confirmed) this.onDelete.emit(this.exercise);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  public saveChanges(): void {
    this.trackerService.saveExercise(this.exercise);
  }

  public editModal(): void {
    const editExerciseModal = this.modalService.show(EditExerciseModalComponent, {
			initialState: {
				exercise: this.exercise
			},
			ignoreBackdropClick: true
		});

		editExerciseModal.content?.edited.subscribe({
      next: (edited: boolean) => {
        this.onEdit.emit(edited);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
}

import { Component } from '@angular/core';
import { TrackerService } from '../tracker.service';
import { ExerciseSession } from '../models/exercise-session.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import {
  faChevronDown,
  faChevronUp,
  faDownload,
  faUpload,
  faPlusSquare,
  faTrashAlt,
  faChartLine,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { UploadFileTypes } from 'src/app/shared/enums/enums';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AddExerciseModalComponent } from '../add-exercise/add-exercise-modal.component';

@Component({
  selector: 'tracker-app',
  templateUrl: './tracker-app.component.html',
  styleUrls: ['./tracker-app.component.scss'],
})
export class TrackerAppComponent {
    public allExercises: ExerciseSession[];
    public uploadFileTypes = UploadFileTypes;
    public icons: any = {
        chevronUp: faChevronUp,
        chevronDown: faChevronDown,
        download: faDownload,
        upload: faUpload,
        add: faPlusSquare,
        trash: faTrashAlt,
        chart: faChartLine,
        cog: faCog
    };

    constructor(
        private trackerService: TrackerService,
        private modalService: BsModalService,
        private sanitizer: DomSanitizer,
        private toastr: ToastrService,
        private router: Router
        ) {

        this.allExercises = this.trackerService.allExercises;

        this.trackerService.reloadData$.subscribe({
        next: (reload: boolean) => {
            console.log('reloading data...');
            if (reload) this.updateExercises();
        },
        error: (error: any) => {
            console.error(error);
        }
        });
    }

    public addExercise(): void {
        const addExerciseModal = this.modalService.show(AddExerciseModalComponent, {
            ignoreBackdropClick: true
        });

        addExerciseModal.content?.created.subscribe({
            next: (created: boolean) => {
                if (created) this.updateExercises();
            },
            error: (error: any) => {
                console.error(error);
            }
        });
    }

    public deleteExercise(exercise: ExerciseSession): void {
        this.allExercises = this.trackerService.deleteExercise(exercise);
    }

    public search(searchTerm: string): void {
        this.allExercises = searchTerm
        ? this.trackerService.search(searchTerm)
        : this.trackerService.allExercises
    }

    public updateExercises(): void {
        this.allExercises = this.trackerService.allExercises;
    }

    public get saveAsCsvURL(): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.trackerService.saveAsCsvBlobURL());
    }

    public get saveAsJsonURL(): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.trackerService.saveAsJsonBlobURL());
    }

    public confirmUpload(eventData: Event, fileType: UploadFileTypes): void {
        const confirmationText: string = `Are you sure you wish to upload new data, it will overwrite existing data ?`;

        const confirm = this.modalService.show(ConfirmModalComponent, {
            initialState: {
                confirmationText: confirmationText
            },
            ignoreBackdropClick: true
        });

        confirm.content?.confirmed.subscribe({
            next: (confirmed: boolean) => {
                if (confirmed && fileType === UploadFileTypes.CSV) this.uploadCSV(eventData);
                if (confirmed && fileType === UploadFileTypes.JSON) this.uploadJSON(eventData);
            },
            error: (error: any) => {
                console.error(error);
            }
        });
    }

    public uploadCSV(eventData: Event): void {
        let files: FileList | null = (eventData.target as HTMLInputElement).files;

        if (!files || files.length === 0) {
            this.toastr.error('No files were detected in your upload');
            return;
        }

        let file: File | null = files.item(0);
        if (!file) {
            this.toastr.error('Something is wrong with the uploaded file');
            return;
        }

        this.trackerService.loadCSVData(file);
    }

    public uploadJSON(eventData: Event): void {
        let files: FileList | null = (eventData.target as HTMLInputElement).files;

        if (!files || files.length === 0) {
            this.toastr.error('No files were detected in your upload');
            return;
        }

        let file: File | null = files.item(0);
        if (!file) {
            this.toastr.error('Something is wrong with the uploaded file');
            return;
        }

        this.trackerService.loadJSONData(file);
    }

    public clearCache(): void {
        const confirmationText: string = `Are you sure you wish to clear the browser cache ?`;

        const confirm = this.modalService.show(ConfirmModalComponent, {
            initialState: {
                confirmationText: confirmationText
            },
            ignoreBackdropClick: true
        });

        confirm.content?.confirmed.subscribe({
            next: (confirmed: boolean) => {
                if (confirmed) this.trackerService.clearCache();
            },
            error: (error: any) => {
                console.error(error);
            }
        });
    }

    public viewStats(): void {
        this.router.navigate(['stats']);
    }

    public goToSettings(): void {
        this.router.navigate(['/config']);
    }
}

import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { ExerciseComponent } from './exercise/exercise.component';
import { TrackerRoutingModule } from './tracker-routing.module';
import { TrackerService } from './tracker.service';
import { SearchComponent } from '../shared/search/search.component';
import { FormsModule } from '@angular/forms';
import { TrackerAppComponent } from './tracker-app/tracker-app.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddExerciseModalComponent } from './add-exercise/add-exercise-modal.component';
import { EditExerciseModalComponent } from './edit-exercise-modal/edit-exercise-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { StatsComponent } from './stats/stats.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { GoalProgressStatComponent } from './stats/goal-progress-stat/goal-progress-stat.component';
import { ConfigComponent } from './config/config.component';
import { DebugComponent } from '../shared/debug/debug.component';
import { MileCountStatComponent } from './stats/mile-count-stat/mile-count-stat.component';

@NgModule({
  declarations: [
    ExerciseComponent,
    TrackerAppComponent,
    SearchComponent,
    AddExerciseModalComponent,
    EditExerciseModalComponent,
    StatsComponent,
    GoalProgressStatComponent,
    ConfigComponent,
    DebugComponent,
    MileCountStatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TrackerRoutingModule,
    CollapseModule.forRoot(),
    FontAwesomeModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ProgressbarModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    })
  ],
  providers: [TrackerService, DatePipe],
})
export class TrackerModule { }

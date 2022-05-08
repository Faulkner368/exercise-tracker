import { Component, Input, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ExerciseSession } from '../../models/exercise-session.model';
import { TrackerService } from '../../tracker.service';

@Component({
  selector: 'et-daily-mileage-stat',
  templateUrl: './daily-mileage-stat.component.html',
  styleUrls: ['./daily-mileage-stat.component.scss']
})
export class DailyMileageStatComponent implements OnInit {
    @Input() public goal: number;
    @Input() public progress: number;
    @Input() public header: string;
    public daysRemaining: number;
    public dailyGoal: number;
    private isTodayDone: boolean = false;
    private today: Date = new Date();
    public goalComplete: boolean = false;
    public completed = faCheck

    constructor(private trackerService: TrackerService) { }

    private get exercises(): ExerciseSession[] {
        return this.trackerService.allExercises;
    }

    public ngOnInit(): void {
        this.goalComplete = this.progress >= this.goal;
        this.isTodayDone = this.exercises.some(ex => (ex.date.getDay() + 1) === (this.today.getDate() + 1));
        this.daysRemaining = this.calculateDaysRemaining();
        this.dailyGoal = this.calculateDailyGoal();
    }

    public calculateDaysRemaining(): number {
        return this.trackerService.pcConfig.numberOfDays - (this.today.getDate() + (this.isTodayDone ? 1 : 0));
    }

    public calculateDailyGoal(): number {
        return +((this.goal - this.progress) / this.daysRemaining).toFixed(1);
    }
}

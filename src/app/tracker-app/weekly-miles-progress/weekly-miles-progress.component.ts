import { Component, OnInit } from '@angular/core';
import { TrackerService } from '../tracker.service';

@Component({
  selector: 'et-weekly-miles-progress',
  templateUrl: './weekly-miles-progress.component.html',
  styleUrls: ['./weekly-miles-progress.component.scss']
})
export class WeeklyMilesProgressComponent implements OnInit {
    public progress: number = 0;
    public today: Date = new Date();
    
    constructor(private trackerService: TrackerService) { }
    
    public ngOnInit(): void {
        this.progress = this.calculateWeeklyMileage();
    }

    public calculateWeeklyMileage(): number {
        const weekInDaysExcludingToday: number = 7;
        const lastWeek = new Date();
        lastWeek.setDate(this.today.getDate() - weekInDaysExcludingToday);
        const weeksExercises = this.trackerService.allExercises.filter(ex => ex.date > lastWeek && ex.date <= this.today);
        console.log(weeksExercises);
        return weeksExercises.reduce((accumulator, current) => accumulator + current.miles, 0);
    }
}

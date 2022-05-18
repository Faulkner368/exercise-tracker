import { Component, Input, OnInit } from '@angular/core';
import { TrackerService } from '../../tracker.service';

@Component({
  selector: 'et-goal-progress-stat',
  templateUrl: './goal-progress-stat.component.html',
  styleUrls: ['./goal-progress-stat.component.scss']
})
export class GoalProgressStatComponent implements OnInit {
    @Input() public goal: number;
    @Input() public header: string;
    public actualMilesComplete: number = 0;
    public goalProgress: number = 0;
    public barColor: any = 'danger';

    constructor(private trackerService: TrackerService) { }

    public ngOnInit(): void {
        this.actualMilesComplete = this.trackerService.milesCompleted;
        this.goalProgress = Math.ceil((this.actualMilesComplete / this.goal) * 100);
        this.barColor = this.populateBarColor();
    }

    public populateBarColor(): string {
        switch(true) {
        case this.goalProgress < 33:
            return 'danger';
        case this.goalProgress >= 33 && this.goalProgress < 66:
            return 'info';
        case this.goalProgress >= 66:
            return 'success';
        default:  
            return 'danger';
        }
    }
}

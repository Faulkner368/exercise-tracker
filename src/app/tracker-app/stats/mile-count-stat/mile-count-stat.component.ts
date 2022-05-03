import { Component, Input, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'et-mile-count-stat',
  templateUrl: './mile-count-stat.component.html',
  styleUrls: ['./mile-count-stat.component.scss']
})
export class MileCountStatComponent implements OnInit {
    @Input() public goal: number;
    @Input() public progress: number;
    @Input() public header: string;
    public completed = faCheck
    public goalComplete: boolean = false;

    constructor() { }

    public ngOnInit(): void {
        this.goalComplete = this.progress >= this.goal;
    }
}

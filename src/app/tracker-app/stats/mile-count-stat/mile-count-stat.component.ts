import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'et-mile-count-stat',
  templateUrl: './mile-count-stat.component.html',
  styleUrls: ['./mile-count-stat.component.scss']
})
export class MileCountStatComponent implements OnInit {
    @Input() public goal: number;
    @Input() public progress: number;
    @Input() public header: string;

    constructor() { }

    public ngOnInit(): void {
    }
}

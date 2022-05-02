import { Component, OnInit } from '@angular/core';
import { TrackerService } from '../tracker.service';

import { COLOR_HEXES } from '../models/colors';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'et-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
    public icons: any = {
        back: faAngleDoubleLeft
    };

    constructor(public trackerService: TrackerService, private router: Router) { }
    
    public ngOnInit(): void { }

    public goBack(): void {
        this.router.navigate(['/']);
    }
}

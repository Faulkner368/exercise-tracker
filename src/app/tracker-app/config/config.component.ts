import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseCacheConfig } from '../models/config.model';
import { TrackerService } from '../tracker.service';
import * as _ from 'lodash';

@Component({
  selector: 'et-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
    private _preEditConfig: ExerciseCacheConfig;

    constructor(
        private trackerService: TrackerService,
        private router: Router
    ) { }

    public ngOnInit(): void {
        this._preEditConfig = _.cloneDeep(this.trackerService.pcConfig);
    }

    public get preEditConfig(): ExerciseCacheConfig {
        return this._preEditConfig;
    }

    public get lodashConst(): _.LoDashStatic {
        return _;
    }

    public get config(): ExerciseCacheConfig {
        return this.trackerService.pcConfig;
    }

    public get numberOfDays(): number {
        return this.trackerService.pcConfig.numberOfDays;
    }

    public get initialGoalinMiles(): number {
        return this.trackerService.pcConfig.initialGoalinMiles;
    }
    
    public get goalInMiles(): number {
        return this.trackerService.pcConfig.goalInMiles;
    }

    public get stretchGoalInMiles(): number {
        return this.trackerService.pcConfig.stretchGoalInMiles;
    }

    public saveConfig(): void {
        this.trackerService.persistConfig();
        this._preEditConfig = _.cloneDeep(this.trackerService.pcConfig);
    }

    public goBack(): void {
        this.router.navigate(['/']);
    }
}

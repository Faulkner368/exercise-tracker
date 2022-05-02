export class ExerciseCacheConfig {
    public numberOfDays: number = 31;
    public initialGoalinMiles: number = 61;
    public goalInMiles: number = 250;
    public stretchGoalInMiles: number = 300;

    constructor(values: any = {}) {
        Object.assign(this, values);
    }
}
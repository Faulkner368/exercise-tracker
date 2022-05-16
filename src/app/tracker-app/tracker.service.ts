import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { ReadFileContent } from '../shared/read-file-content';
import { ExerciseCacheConfig } from './models/config.model';
import { SESSSION_LABELS } from './models/exercise-data';
import { ExerciseSession } from './models/exercise-session.model';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {
    public pcConfig: ExerciseCacheConfig = new ExerciseCacheConfig();
    public reloadData$ = new BehaviorSubject<boolean>(false);
    private readFileContent: ReadFileContent = new ReadFileContent();
    private loadedExercises: ExerciseSession[] = [];
    private _allExercises: ExerciseSession[] = [];
    private exerciseCacheKey: string = 'exercise-tracker';
    private configCacheKey: string = 'exercise-config-cache';

    constructor(private toastr: ToastrService) {
        this.loadExercises();
        this.loadConfig();
    }

    public get allExercises(): ExerciseSession[] {
        return this._allExercises.sort(
            (a: ExerciseSession, b: ExerciseSession) => {
                return +b.date - +a.date;
        });
    }

    public get exerciseLabels(): string[] {
        return _.uniq([...SESSSION_LABELS, ...this.uniqueSetOfExerciseLabels()]);
    }

    public get milesCompleted(): number {
        return this.allExercises.reduce((accumulator, current) => 
        accumulator + current.miles, 0);
    }

    private loadConfig(): void {
        const configData = localStorage.getItem(this.configCacheKey);

        if (configData) {
            this.pcConfig = new ExerciseCacheConfig(JSON.parse(configData));
        } else {
            this.pcConfig = new ExerciseCacheConfig();
            this.persistConfig();
        }
    }

    public persistConfig(): void {
        localStorage.setItem(this.configCacheKey, JSON.stringify(this.pcConfig));

        this.toastr.success('Exercise Tracker configuration saved successfully...');
    }

    private loadExercises(): void {
        const exerciseData = localStorage.getItem(this.exerciseCacheKey);

        if (exerciseData) {
        const parsedData: ExerciseSession[] = JSON.parse(exerciseData);
        parsedData.map(exercise => this._allExercises.push(new ExerciseSession(exercise)));

        this._allExercises.sort(
            (a: ExerciseSession, b: ExerciseSession) => {
                return +b.date - +a.date;
            });
        }
    }

    public stringifiedExercises(): string {
        return JSON.stringify(this._allExercises);
    }

    private persistExercises(): void {
        localStorage.setItem(this.exerciseCacheKey, this.stringifiedExercises());
    }

    public addExercise(exercise: ExerciseSession): void {
        exercise.label = exercise.label.replace(',', '');

        this._allExercises.push(exercise);
        this.persistExercises();

        this.toastr.success(`Exercise "${exercise.label}" added successfully.`);
    }

    public saveExercise(newExercise: ExerciseSession): void {
        let existingExercise = this._allExercises.find(p => p.id === newExercise.id);

        if (existingExercise) {
        this._allExercises = this._allExercises.map(prod => prod.id === newExercise.id ? newExercise : prod);
        this.persistExercises();
        }

        this.toastr.success(`Exercise "${newExercise.label}" saved successfully`);
    }

    public deleteExercise(exercise: ExerciseSession): ExerciseSession[] {
        this._allExercises = this._allExercises.filter(p => p.id !== exercise.id);
        this.persistExercises();

        this.toastr.success(`Exercise "${exercise.label}" deleted successfully`);

        return this.allExercises;
    }

    public search(searchTerm: string): ExerciseSession[] {
        return this.allExercises.filter(exercise =>
            exercise.searchable.includes(searchTerm.toLocaleLowerCase())
        );
    }

    public loadJSONData(jsonFile: File): void {
        this.readFileContent.readFileReturnContentAndTearDown(jsonFile);
        this.readFileContent.reader.addEventListener('load', () => {
            this.processJSONFileContents();
            this.refreshLoadedDataAndTearDown();
        });
    }

    private processJSONFileContents(): void {
        this.loadedExercises = JSON.parse(this.readFileContent.fileContent) as ExerciseSession[];
    }

    public loadCSVData(csvFile: File): void {
        this.readFileContent.readFileReturnContentAndTearDown(csvFile);
        this.readFileContent.reader.addEventListener('load', () => {
            this.processCSVFileContents();
            this.refreshLoadedDataAndTearDown();
        });
    }

    private processCSVFileContents(): void {
        const rows = this.readFileContent.fileContent?.split('\n').slice(1);
        
        rows?.map(row => {
            if (row?.includes(',')) {
                const exercise = this.instantiateExerciseFromCSVRow(row);
                this.loadedExercises.push(exercise);
            } else {
                console.log(`csv row has no comma delimiters: ${row}`);
            }
        });
    }

    private instantiateExerciseFromCSVRow(row: string): ExerciseSession {
        const cells = row.split(',');
        return new ExerciseSession({ label: cells[0], expiryDate: new Date(cells[1]), calories: cells[2], comment: cells[3] })
    }

    private refreshLoadedDataAndTearDown(): void {
        if (this.loadedExercises.length > 0) {
            this.refreshDataWith();
        }

        this.tearDownLoadedData();
    }

    private refreshDataWith(): void {
        this._allExercises = this.loadedExercises;

        this.persistExercises();

        this.reloadData$.next(true);

        this.toastr.success(`${this._allExercises.length} exercise${this._allExercises.length < 2 ? '' : 's'} has been loaded`);
    
    }

    private tearDownLoadedData(): void {
        this.loadedExercises = [];
        this.readFileContent = new ReadFileContent();
    }

    private getColumns(): string {
        return `Exercise,Date,Miles\n`;
    }

    private getRow(exercise: ExerciseSession): string {
        const date = new Date(exercise?.date);
        let row: string = `${exercise?.label},`;
        row += `${date.toDateString()},`;
        row += `${exercise?.miles}\n`;

        return row;
    }

    public saveAsCsvBlobURL(): string {
        let csvData = `${this.getColumns()}`;

        this._allExercises?.map(exercise => {
        csvData += `${this.getRow(exercise)}`;
        });

        csvData = csvData.slice(0, -1);

        let blob = new Blob([csvData], { type: 'text/csv' });

        return window.URL.createObjectURL(blob);
    }

    public saveAsJsonBlobURL(): string {
        let blob = new Blob([this.stringifiedExercises()], { type: 'application/json' });
        return window.URL.createObjectURL(blob);
    }

    public clearCache(): void {
        const exerciseCount: number = this._allExercises.length;

        localStorage.removeItem(this.exerciseCacheKey);
        this._allExercises = [];

        this.toastr.success(`${exerciseCount} cached exercise${exerciseCount < 2 ? '' : 's' } have been removed.`);

        this.reloadData$.next(true);
    }

    private uniqueSetOfExerciseLabels(): string[] {
        return _.uniq(this.allExercises.map(p => p.label));    
    }
}

import * as uuid from "uuid";

export class ExerciseSession {
  public id: string = '';
  public date: Date = new Date();
  public label : string;
  public miles: number = 0;

  constructor(values: any = {}) {
    Object.assign(this, values);

    if (!this.id) this.id = uuid.v4();
    if (values.date) this.date = new Date(values.date);
  }

  public get searchable(): string {
    return `${this.label} ${this.date.toDateString()} ${this.miles}`.toLocaleLowerCase();
  }

  public get stringify(): string {
    return JSON.stringify(this);
  }
}

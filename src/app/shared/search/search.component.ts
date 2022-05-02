import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() public searchTerm: string = '';
  @Output() public searching = new EventEmitter<string>();

  constructor() { }

  public onChange(): void {
    this.searching.emit(this.searchTerm);
  }
}

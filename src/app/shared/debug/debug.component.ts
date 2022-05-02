import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss']
})
export class DebugComponent implements OnInit {
    @Input() public value: any;
    
  constructor() { }

  public ngOnInit(): void {
  }

}

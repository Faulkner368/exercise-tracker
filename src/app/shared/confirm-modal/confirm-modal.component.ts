import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @Input() public confirmationText: string ='';
  @Output() public confirmed = new EventEmitter<boolean>();

  public icons: any = {
    windowClose: faWindowClose
  };

  constructor(public bsModalRef: BsModalRef) { }

  public ngOnInit(): void {
  }

  public confirm(): void {
    this.confirmed.emit(true);
    this.bsModalRef.hide();
  }

  public cancel(): void {
    this.confirmed.emit(false);
    this.bsModalRef.hide();
  }
}

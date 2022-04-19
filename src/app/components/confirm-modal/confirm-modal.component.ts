import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'spending-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @Output() onClick = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}

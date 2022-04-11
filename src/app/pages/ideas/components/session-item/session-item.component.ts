import { Component, Input, OnInit } from '@angular/core';
import { IDepartmentResponse } from 'app/interfaces/serve-response';

@Component({
  selector: 'spending-session-item',
  templateUrl: './session-item.component.html',
  styleUrls: ['./session-item.component.scss']
})
export class SessionItemComponent implements OnInit {
  @Input() session: IDepartmentResponse = {} as IDepartmentResponse;
  constructor() { }

  ngOnInit(): void {
  }

}

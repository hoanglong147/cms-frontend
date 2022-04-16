import { Component, Input, OnInit } from '@angular/core';
import { IDepartmentResponse } from 'app/interfaces/serve-response';
import { HelperService } from 'app/services/helper.service';

@Component({
  selector: 'spending-session-item',
  templateUrl: './session-item.component.html',
  styleUrls: ['./session-item.component.scss']
})
export class SessionItemComponent implements OnInit {
  @Input() session: IDepartmentResponse = {} as IDepartmentResponse;
  endDateIdea = new Date();
  isAvailable = true;
  constructor(
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.endDateIdea = new Date(this.session.closureDateIdea);
    const current = new Date();
    const startDate = new Date(this.session.startDate);
    const endDate = new Date(this.session.clouserDate);
    if (current.getTime() - startDate.getTime() < 0 || current.getTime() - endDate.getTime() > 0) {
      this.isAvailable = false;
    }
  }
  onClick() {
    if (!this.isAvailable) {
      this.helperService.showError('', 'Session not yet available or out of time');
    }
  }
}

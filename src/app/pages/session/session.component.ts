import { Component, OnInit } from '@angular/core';
import { PAGE_SIZE, STATUS_CODE } from 'app/constant/constant';
import { IDepartmentResponse } from 'app/interfaces/serve-response';
import { IdeasService } from '../ideas/services/ideas.service';

@Component({
  selector: 'spending-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  sessions: IDepartmentResponse[] = [];
  params = {
    key: '',
    page: 0,
    size: PAGE_SIZE
  }
  constructor(
    private ideaService: IdeasService
  ) { }

  ngOnInit(): void {
    this.getSession();
  }

  getSession() {
    this.ideaService.getSession(this.params).subscribe(res => {
      if (res.code === STATUS_CODE.SUCCESS) {
        const { items, total } = res.data;
        this.sessions = items;
      }
      console.log('sessions', res);
    })
  }
  openModalAddEdit(index: number = -1, category: IDepartmentResponse = {} as IDepartmentResponse) {

  }

}

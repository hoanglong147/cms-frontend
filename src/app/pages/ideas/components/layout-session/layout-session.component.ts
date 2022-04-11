import { Component, OnInit } from '@angular/core';
import { PAGE_SIZE, STATUS_CODE } from 'app/constant/constant';
import { Subscription } from 'rxjs';
import { IdeasService } from '../../services/ideas.service';

@Component({
  selector: 'spending-layout-session',
  templateUrl: './layout-session.component.html',
  styleUrls: ['./layout-session.component.scss']
})
export class LayoutSessionComponent implements OnInit {
  subscription = new Subscription();
  params = {
    key: '',
    page: 0,
    size: PAGE_SIZE
  }
  sessions = [];
  constructor(
    private ideaService: IdeasService
  ) { }

  ngOnInit(): void {
    this.getSession();
  }

  getSession() {
    this.ideaService.getSession(this.params).subscribe(res => {
      if (res.code === STATUS_CODE.SUCCESS) {
        this.sessions = res.data;
      }
      console.log('sessions', res);
    })
  }

}

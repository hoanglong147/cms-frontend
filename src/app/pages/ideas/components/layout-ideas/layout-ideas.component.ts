import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PAGE_SIZE, STATUS_CODE } from 'app/constant/constant';
import { IIdeaResponse } from 'app/interfaces/serve-response';
import { IdeasService } from '../../services/ideas.service';

@Component({
  selector: 'spending-layout-ideas',
  templateUrl: './layout-ideas.component.html',
  styleUrls: ['./layout-ideas.component.scss']
})
export class LayoutIdeasComponent implements OnInit {
  params = {
    departmentId: -1,
    page: 0,
    size: PAGE_SIZE
  }
  ideas: IIdeaResponse[] = [];
  total = 0;
  constructor(
    private activeRoute: ActivatedRoute,
    private ideaService: IdeasService
  ) {
    const params = this.activeRoute.snapshot.params;
    if (params['sessionId']) {
      this.params.departmentId = params['sessionId'];
      this.params.page = 0;
      this.getListIdeas();
    }
  }

  ngOnInit(): void {
  }

  getListIdeas() {
    this.ideaService.getIdeasBySession(this.params).subscribe(res => {
      console.log(res);
      if (res.code === STATUS_CODE.SUCCESS) {
        const { items, total } = res.data;
        this.ideas.push(...items);
        this.total = total
      }
    })
  }

}

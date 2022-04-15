import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PAGE_SIZE, ROLE, STATUS_CODE } from 'app/constant/constant';
import { IUser } from 'app/interfaces/model';
import { IIdeaResponse } from 'app/interfaces/serve-response';
import { SubjectService } from 'app/services/subject.service';
import { Observable } from 'rxjs';
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
    size: PAGE_SIZE,
    sortBy: 'LIKE'
  }
  ideas: IIdeaResponse[] = [];
  total = 0;
  userInfo$: Observable<IUser>;
  showPostIdea = true;
  readonly ROLE = ROLE;
  constructor(
    private activeRoute: ActivatedRoute,
    private ideaService: IdeasService,
    private subjectService: SubjectService
  ) {
    const params = this.activeRoute.snapshot.params;
    if (params['sessionId']) {
      this.params.departmentId = params['sessionId'];
      this.params.page = 0;
      this.getListIdeas();
    }
  }

  ngOnInit(): void {
    this.userInfo$ = this.subjectService.userInfo.asObservable();
  }

  getListIdeas() {
    this.ideaService.getIdeasBySession(this.params).subscribe(res => {
      console.log(res);
      if (res.code === STATUS_CODE.SUCCESS) {
        const { items, total } = res.data;
        this.ideas.push(...items);
        this.total = total;
      }
    })
  }
  onSortChange($event: 'LIKE' | 'COMMENT') {
    this.params.sortBy = $event;
    this.params.page = 0;
    this.ideas = [];
    this.getListIdeas();
  }
  onCreateIdea($event: IIdeaResponse) {
    this.ideas.unshift($event);
    this.total += 1;
  }
}

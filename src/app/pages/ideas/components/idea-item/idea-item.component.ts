import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LikeStatus } from 'app/constant/constant';
import { IIdeaResponse } from 'app/interfaces/serve-response';
import { SubjectService } from 'app/services/subject.service';
import { environment } from 'environments/environment';
import { IdeasService } from '../../services/ideas.service';

@Component({
  selector: 'spending-idea-item',
  templateUrl: './idea-item.component.html',
  styleUrls: ['./idea-item.component.scss']
})
export class IdeaItemComponent implements OnInit {
  @Input() idea: IIdeaResponse = {} as IIdeaResponse;
  @Input() isLike = false;
  @Input() set attachFile(attachFile: string) {
    if (attachFile) { this.fileUrl = `${environment.apiUrl}ideas/attach/${(new URL(attachFile)).pathname.split('/').splice(-1)[0]}`; }
  }
  sessionId = -1;
  fileUrl = '';
  queryParams = {};
  readonly LIKE_STATUS = LikeStatus;
  constructor(
    private activeRoute: ActivatedRoute,
    private ideaService: IdeasService,
    private subjectService: SubjectService
  ) {
    const params = this.activeRoute.snapshot.params;
    if (params['sessionId']) {
      this.sessionId = params['sessionId'];
    }
    this.queryParams = this.activeRoute.snapshot.queryParams;
  }

  ngOnInit(): void {
    if (!this.idea.likeStatus) {
      this.idea.likeStatus = this.LIKE_STATUS.INACTIVE;
    }
  }

  likeIdea() {
    this.idea.totalLike += 1;
    this.idea.likeStatus += 1;
    if (this.idea.likeStatus > 3) {
      this.idea.likeStatus = this.LIKE_STATUS.INACTIVE;
    }
    const { userId } = this.subjectService.userInfo.getValue();
    this.ideaService.likeIdea({
      staffId: userId,
      ideaId: this.idea.ideaId,
      status: this.idea.likeStatus,
    }).subscribe(res => console.log(res));
  }
}

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
    if (attachFile) {
      this.fileName = (new URL(attachFile)).pathname.split('/').splice(-1)[0];
      this.fileUrl = `${environment.apiUrl}ideas/attach/${this.fileName}`;
    }
  }
  sessionId = -1;
  fileUrl = '';
  queryParams = {};
  fileName = ''
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
    this.validateLike();
  }

  likeIdea($event: MouseEvent, status: LikeStatus) {
    $event.stopPropagation();
    $event.preventDefault();
    const statusUpdated = this.configStatus(status);

    if (statusUpdated === LikeStatus.INACTIVE) {
      return;
    }

    const { userId } = this.subjectService.userInfo.getValue();
    this.ideaService.likeIdea({
      staffId: userId,
      ideaId: this.idea.ideaId,
      status: statusUpdated,
    }).subscribe(res => console.log(res));
  }

  configStatus(status: LikeStatus) {
    // unlike
    if (this.idea.likeStatus === status) {
      return LikeStatus.INACTIVE;
    }

    let n = 1;
    if (this.idea.likeStatus !== LikeStatus.INACTIVE) {
      n = 2;
      this.idea.totalDislike -= 1;
      this.idea.totalLike -= 1;
    }
    if (status === LikeStatus.DISLIKE) {
      this.idea.totalDislike += n;
    }
    if (status === LikeStatus.LIKE) {
      this.idea.totalLike += n;
    }
    this.idea.likeStatus = status;

    return status;
  }

  validateLike() {
    this.idea.totalDislike = this.idea.totalDislike >= 0 ? this.idea.totalDislike : 0;
    this.idea.totalLike = this.idea.totalLike >= 0 ? this.idea.totalLike : 0;
  }
}

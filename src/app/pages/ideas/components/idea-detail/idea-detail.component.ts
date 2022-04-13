import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PAGE_SIZE, STATUS_CODE } from 'app/constant/constant';
import { IIdeaDetailResponse, IIdeaResponse } from 'app/interfaces/serve-response';
import { HelperService } from 'app/services/helper.service';
import { SubjectService } from 'app/services/subject.service';
import { IdeasService } from '../../services/ideas.service';

@Component({
  selector: 'spending-idea-detail',
  templateUrl: './idea-detail.component.html',
  styleUrls: ['./idea-detail.component.scss']
})
export class IdeaDetailComponent implements OnInit {
  ideaDetail: IIdeaDetailResponse = {} as IIdeaDetailResponse;
  idea: IIdeaResponse = {} as IIdeaResponse;
  params = {
    ideaId: -1,
    page: 0,
    size: PAGE_SIZE
  }
  comments: string[] = [];
  totalComments = 0;
  commentText = '';
  loading = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private ideaService: IdeasService,
    private subjectService: SubjectService,
    private helperService: HelperService
  ) {
    const params = this.activeRoute.snapshot.params;
    if (params['sessionId'] && params['id']) {
      this.params.ideaId = params['id'];
      this.idea.departmentId = params['sessionId'];
      this.getDetailIdea();
    }
  }

  ngOnInit(): void {
  }

  getDetailIdea() {
    this.ideaService.getDetailIdea(this.params).subscribe(res => {
      if (res.code === STATUS_CODE.SUCCESS) {
        this.ideaDetail = res.data;
        this.idea = {
          ...this.idea,
          name: this.ideaDetail.ideaName,
          totalComment: this.ideaDetail.totalComment,
          totalLike: this.ideaDetail.totalLike,
          description: this.ideaDetail.description,
          ideaId: this.ideaDetail.ideaId
        };
        this.comments = this.ideaDetail.detailComment.items;
      }
    })
  }

  postComment() {
    if (!this.commentText) {
      return;
    }
    const { userId } = this.subjectService.userInfo.getValue();
    this.loading = true;
    this.ideaService.postComment({
      anonymous: false,
      content: this.commentText,
      ideaId: this.ideaDetail.ideaId,
      staffId: userId
    }).subscribe(res => {
      this.loading = false;
      if (res.code === STATUS_CODE.CREATED) {
        this.comments.unshift(this.commentText);
        this.idea.totalComment += 1;
        this.commentText = '';
      }
    }, err => this.loading = false);

  }
}

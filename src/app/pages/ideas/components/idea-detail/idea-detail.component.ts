import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IIdeaResponse } from 'app/interfaces/serve-response';
import { IdeasService } from '../../services/ideas.service';

@Component({
  selector: 'spending-idea-detail',
  templateUrl: './idea-detail.component.html',
  styleUrls: ['./idea-detail.component.scss']
})
export class IdeaDetailComponent implements OnInit {
  idea: IIdeaResponse = {} as IIdeaResponse;
  constructor(
    private activeRoute: ActivatedRoute,
    private ideaService: IdeasService
  ) {
    const params = this.activeRoute.snapshot.params;
    if (params['sessionId'] && params['id']) {
      this.getDetailIdea(params['sessionId'], params['id']);
    }
  }
  getDetailIdea(sessionId: number, ideaId: number) {

  }

  ngOnInit(): void {
  }



}

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IIdeaResponse } from 'app/interfaces/serve-response';

@Component({
  selector: 'spending-idea-item',
  templateUrl: './idea-item.component.html',
  styleUrls: ['./idea-item.component.scss']
})
export class IdeaItemComponent implements OnInit {
  @Input() idea: IIdeaResponse = {} as IIdeaResponse;
  sessionId = -1;
  constructor(
    private activeRoute: ActivatedRoute,
  ) {
    const params = this.activeRoute.snapshot.params;
    if (params['sessionId']) {
      this.sessionId = params['sessionId'];
    }
  }

  ngOnInit(): void {
  }

}

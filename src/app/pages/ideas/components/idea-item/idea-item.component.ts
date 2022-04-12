import { Component, Input, OnInit } from '@angular/core';
import { IIdeaResponse } from 'app/interfaces/serve-response';

@Component({
  selector: 'spending-idea-item',
  templateUrl: './idea-item.component.html',
  styleUrls: ['./idea-item.component.scss']
})
export class IdeaItemComponent implements OnInit {
  @Input() idea: IIdeaResponse = {} as IIdeaResponse;
  constructor() { }

  ngOnInit(): void {
  }

}

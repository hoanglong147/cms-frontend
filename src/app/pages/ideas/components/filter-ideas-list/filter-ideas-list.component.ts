import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'spending-filter-ideas-list',
  templateUrl: './filter-ideas-list.component.html',
  styleUrls: ['./filter-ideas-list.component.scss']
})
export class FilterIdeasListComponent implements OnInit {
  @Output() onSortChange = new EventEmitter();
  sortValue: 'LIKE' | 'COMMENT' = 'LIKE';
  constructor() { }

  ngOnInit(): void {
  }

}

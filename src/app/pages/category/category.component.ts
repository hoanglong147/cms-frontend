import { Component, OnInit } from '@angular/core';
import { ICategoryResponse } from 'app/interfaces/serve-response';
import { Observable } from 'rxjs';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'spending-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories$: Observable<ICategoryResponse[]>
  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategory();
  }

}

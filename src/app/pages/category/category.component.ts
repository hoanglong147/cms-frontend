import { Component, OnInit } from '@angular/core';
import { ICategoryResponse } from 'app/interfaces/serve-response';
import { Observable } from 'rxjs';
import { CategoryService } from './services/category.service';
import { BsModalService } from 'ngx-bootstrap/modal'
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { HelperService } from '../../services/helper.service'
@Component({
  selector: 'spending-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories$: Observable<ICategoryResponse[]>
  constructor(
    private categoryService: CategoryService,
    private modalService: BsModalService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategory();
  }

  openModalAddEdit(index: number = -1, category: ICategoryResponse = {} as ICategoryResponse) {
    const modal = this.modalService.show(AddEditCategoryComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        index,
        data: category
      }
    });

    modal.content.onClose.subscribe(res => {
      modal.hide();
      if (res) {
        this.helperService.showSuccess('', 'Action success!!!');
      }
      if (res === false) {
        this.helperService.showError('', 'Action failed!!!');
      }
    });
  }

  deleteCategory(id: number, index: number) {
    this.categoryService.deleteCategory(id, index).subscribe(res => {
      if (res) {
        this.helperService.showSuccess('', 'Delete Success!!!');
      }
    });
  }

}

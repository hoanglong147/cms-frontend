import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'app/interfaces/serve-response';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'spending-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  index: number = -1;
  data: ICategoryResponse = {} as ICategoryResponse;
  form: FormGroup;
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.data.name || '', Validators.required],
      active: this.data.active ?? true
    });
  }

  close(data: any) {
    this.onClose.emit(data);
  }

  onSubmit() {
    console.log(this.index)
    const api = this.index !== -1
      ? this.categoryService.updateCategory(this.form.value, this.index, this.data.id)
      : this.categoryService.createCategory(this.form.value)
    api.subscribe(res => this.close(res));
  }
}

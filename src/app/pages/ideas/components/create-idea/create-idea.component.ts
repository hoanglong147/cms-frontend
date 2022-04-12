import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileFinishPendingType } from 'app/directives/file-handle.directive';
import { ICategoryResponse } from 'app/interfaces/serve-response';
import { CategoryService } from 'app/pages/category/services/category.service';
import { HelperService } from 'app/services/helper.service';
import { Observable } from 'rxjs';
import { IdeasService } from '../../services/ideas.service';

@Component({
  selector: 'spending-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrls: ['./create-idea.component.scss']
})
export class CreateIdeaComponent implements OnInit {
  categories$: Observable<ICategoryResponse[]>;
  form: FormGroup;
  fileUpload: FileFinishPendingType = {} as FileFinishPendingType;
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private ideaService: IdeasService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategory();
    this.form = this.fb.group({
      categoryId: '',
      description: ['', Validators.required],
      date: ['', Validators.required]
    })
  }

  onSubmit() {
    if (!this.fileUpload.file) {
      this.helperService.showError('', 'You must attach file for your idea');
      return;
    }
    const { date, ...formValue } = this.form.value;
    const [startDate, endDate] = date as Date[];
    const formData = new FormData();
    Object.entries(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('startDate', startDate.toISOString());
    formData.append('endDate', endDate.toISOString());
    formData.append('id', 'đéo có');
    formData.append('file', this.fileUpload.file);
    this.ideaService.createIdea(formData).subscribe(res => console.log(res));
  }

  onHandleFileFinish($event: FileFinishPendingType[]) {
    [this.fileUpload] = $event;
  }
}

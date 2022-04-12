import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STATUS_CODE } from 'app/constant/constant';
import { FileFinishPendingType } from 'app/directives/file-handle.directive';
import { ICategoryResponse } from 'app/interfaces/serve-response';
import { CategoryService } from 'app/pages/category/services/category.service';
import { HelperService } from 'app/services/helper.service';
import { SubjectService } from 'app/services/subject.service';
import { Observable } from 'rxjs';
import { IdeasService } from '../../services/ideas.service';

@Component({
  selector: 'spending-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrls: ['./create-idea.component.scss']
})
export class CreateIdeaComponent implements OnInit {
  @Input() departmentId: number = -1;
  categories$: Observable<ICategoryResponse[]>;
  form: FormGroup;
  fileUpload: FileFinishPendingType = {} as FileFinishPendingType;
  @Output() onCreateIdea = new EventEmitter();
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private ideaService: IdeasService,
    private helperService: HelperService,
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    const userInfo = this.subjectService.userInfo.getValue();
    this.categories$ = this.categoryService.getAllCategory();
    this.form = this.fb.group({
      categoryId: '',
      description: ['', Validators.required],
      date: ['', Validators.required],
      name: ['', Validators.required],
      userId: userInfo.userId,
      departmentId: this.departmentId
    })
  }

  onSubmit() {
    this.helperService.markFormGroupTouched(this.form);
    if (this.form.invalid) {
      return;
    }
    if (!this.fileUpload.file) {
      this.helperService.showError('', 'You must attach file for your idea');
      return;
    }
    const { date, ...formValue } = this.form.value;
    const [startDate, endDate] = date as Date[];
    const formData = new FormData();
    Object.entries(formValue).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append('startDate', startDate.toISOString());
    formData.append('endDate', endDate.toISOString());
    formData.append('file', this.fileUpload.file);
    this.ideaService.createIdea(formData).subscribe(res => {
      if (res.code === STATUS_CODE.SUCCESS) {
        this.onCreateIdea.emit(res.data);
      }
    });
  }

  onHandleFileFinish($event: FileFinishPendingType[]) {
    [this.fileUpload] = $event;
  }
}

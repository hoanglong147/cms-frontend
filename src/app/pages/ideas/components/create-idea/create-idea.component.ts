import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  loading = false;
  @Output() onCreateIdea = new EventEmitter();
  @Output() onTimeoutIdea = new EventEmitter();
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private ideaService: IdeasService,
    private helperService: HelperService,
    private subjectService: SubjectService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const userInfo = this.subjectService.userInfo.getValue();
    this.categories$ = this.categoryService.getAllCategory();
    const queryParams = this.activeRoute.snapshot.queryParams;
    if (this.checkTimeout()) {
      this.helperService.showError('', 'Time post idea out');
      this.onTimeoutIdea.emit();
      return;
    }
    this.form = this.fb.group({
      categoryId: ['', Validators.required],
      description: ['', Validators.required],
      name: ['', Validators.required],
      startDate: queryParams['startDate'],
      endDate: queryParams['endDate'],
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
    if (this.checkTimeout()) {
      this.helperService.showError('', 'Time post idea out');
      this.onTimeoutIdea.emit();
      return;
    }
    const formValue = this.form.value;
    const formData = new FormData();
    Object.entries(formValue).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append('file', this.fileUpload.file);
    this.loading = true;
    this.ideaService.createIdea(formData).subscribe(res => {
      this.loading = false;
      if (res.code === STATUS_CODE.SUCCESS) {
        this.onCreateIdea.emit(res.data);
      }
    }, err => this.loading = false);
  }

  checkTimeout() {
    const { endDate } = this.activeRoute.snapshot.queryParams;
    const current = new Date();
    return new Date(endDate).getTime() - current.getTime() <= 0
  }

  onHandleFileFinish($event: FileFinishPendingType[]) {
    [this.fileUpload] = $event;
  }
}

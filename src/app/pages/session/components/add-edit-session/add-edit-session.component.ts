import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IDepartmentResponse } from 'app/interfaces/serve-response';
import { IdeasService } from 'app/pages/ideas/services/ideas.service';
import { HelperService } from 'app/services/helper.service';
import { SubjectService } from 'app/services/subject.service';

@Component({
  selector: 'spending-add-edit-session',
  templateUrl: './add-edit-session.component.html',
  styleUrls: ['./add-edit-session.component.scss']
})
export class AddEditSessionComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  index: number = -1;
  data: IDepartmentResponse = {} as IDepartmentResponse;
  form: FormGroup;
  minDate = new Date();
  loading = false;
  constructor(
    private ideaService: IdeasService,
    private fb: FormBuilder,
    private helperService: HelperService,
    private subjectService: SubjectService
  ) {
  }

  ngOnInit(): void {
    this.minDate.setHours(0, 0, 0, 0);
    const { userId } = this.subjectService.userInfo.getValue();
    this.form = this.fb.group({
      name: [this.data.name || '', Validators.required],
      dateRange: ['', Validators.required],
      closureDateIdea: ['', Validators.required],
      id: userId
    });
    if (this.index !== -1) {
      const { closureDateIdea, closureDate, startDate } = this.data;
      const dateRange = [new Date(startDate), new Date(closureDate)];
      this.form.patchValue({
        dateRange: dateRange,
        closureDateIdea: new Date(closureDateIdea)
      })
    }
  }

  close(data: any) {
    this.onClose.emit(data);
  }

  onSubmit() {
    this.helperService.markFormGroupTouched(this.form);
    if (this.form.invalid) {
      return;
    }

    const { dateRange, closureDateIdea, ...form } = this.form.value;
    const [startDate, closureDate] = dateRange as Date[];

    if (!this.validateDate(startDate, closureDate, closureDateIdea)) {
      this.helperService.showError('', 'Close date idea must in expired date range');
      return;
    }

    const params = {
      ...form,
      startDate: startDate.toISOString(),
      closureDate: closureDate.toISOString(),
      closureDateIdea: closureDateIdea.toISOString()
    }
    this.loading = true;
    const api = this.index !== -1
      ? this.ideaService.updateSession(params, this.data.id)
      : this.ideaService.createSession(params)
    api.subscribe(res => {
      this.close(res.data);
      this.loading = false;
    }, err => this.loading = false);
  }

  validateDate(startDate: Date, endDate: Date, closeDate: Date) {
    if (closeDate.getTime() - startDate.getTime() < 0) {
      return false;
    }

    if (closeDate.getTime() - endDate.getTime() > 0) {
      return false;
    }
    return true;
  }
}

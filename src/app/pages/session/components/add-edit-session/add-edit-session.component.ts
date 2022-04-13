import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IDepartmentResponse } from 'app/interfaces/serve-response';
import { IdeasService } from 'app/pages/ideas/services/ideas.service';
import { HelperService } from 'app/services/helper.service';

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
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.data.name || '', Validators.required],
      dateRange: ['', Validators.required],
      closureDateIdea: ['', Validators.required]
    });
    if (this.index !== -1) {
      const { closureDateIdea, clouserDate, startDate } = this.data;
      const dateRange = [new Date(startDate), new Date(clouserDate)];
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

    const { dateRange, closureDateIdea, name } = this.form.value;
    const [startDate, closureDate] = dateRange as Date[];

    if (!this.validateDate(startDate, closureDate, closureDateIdea)) {
      this.helperService.showError('', 'Close date idea must in expired date range');
      return;
    }

    const params = {
      name,
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

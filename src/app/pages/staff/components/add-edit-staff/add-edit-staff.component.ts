import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IStaffResponse } from 'app/interfaces/serve-response';
import { HelperService } from 'app/services/helper.service';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'spending-add-edit-staff',
  templateUrl: './add-edit-staff.component.html',
  styleUrls: ['./add-edit-staff.component.scss']
})
export class AddEditStaffComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  @Input() index: number = -1;
  @Input() set user(user: IStaffResponse) {
    if (user) {
      this.data = user;
      this.buildForm();
    }
  }
  data: IStaffResponse = {} as IStaffResponse;
  form: FormGroup;
  loading = false;
  constructor(
    private staffService: StaffService,
    private fb: FormBuilder,
    private helperService: HelperService
  ) {

  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      name: [this.data.name || '', Validators.required],
      username: [this.data.username || '', Validators.required],
      password: ['', Validators.required],
      email: [this.data.email || '', [Validators.required, Validators.email]],
      role: [this.data.role || '1', Validators.required],
      position: this.data.position || 'Dev'
    });
    if (this.index !== -1) {
      this.form.controls.password.disable();
      this.form.controls.password.setValidators(null);
      this.form.controls.username.disable();
      this.form.controls.username.setValidators(null);
    }
    if (this.index === -2) {
      this.form.controls.role.disable();
      this.form.controls.role.setValidators(null);
      this.form.controls.position.disable();
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
    this.loading = true;
    const api = this.index !== -1
      ? this.staffService.updateStaff({
        ...this.form.getRawValue(),
        password: '',
        username: this.data.username
      }, this.data.staffId)
      : this.staffService.createStaff(this.form.value)
    api.subscribe(res => {
      this.close(res.data);
      this.loading = false;
    }, err => this.loading = false);
  }
}

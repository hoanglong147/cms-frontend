import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IDepartmentResponse } from 'app/interfaces/serve-response';
import { IdeasService } from 'app/pages/ideas/services/ideas.service';

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
  constructor(
    private ideaService: IdeasService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.data.name || '', Validators.required],
    });
  }

  close(data: any) {
    this.onClose.emit(data);
  }

  onSubmit() {
    const api = this.index !== -1
      ? this.ideaService.updateSession(this.form.value, this.data.id)
      : this.ideaService.createSession(this.form.value)
    api.subscribe(res => this.close(res.data));
  }
}

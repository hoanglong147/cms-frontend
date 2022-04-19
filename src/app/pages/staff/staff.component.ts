import { Component, OnInit } from '@angular/core';
import { ConfirmModalComponent } from 'app/components/confirm-modal/confirm-modal.component';
import { STATUS_CODE } from 'app/constant/constant';
import { IStaffResponse } from 'app/interfaces/serve-response';
import { HelperService } from 'app/services/helper.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddEditStaffComponent } from './components/add-edit-staff/add-edit-staff.component';
import { StaffService } from './services/staff.service';

@Component({
  selector: 'spending-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  staffs: IStaffResponse[] = []
  constructor(
    private staffService: StaffService,
    private modalService: BsModalService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.getStaff();
  }

  getStaff() {
    this.staffService.getAllStaff().subscribe(res => {
      if (res.code === STATUS_CODE.SUCCESS) {
        this.staffs = res.data;
      }
      console.log('sessions', res);
    })
  }

  openModalAddEdit(index: number = -1, staff: IStaffResponse = {} as IStaffResponse) {
    const modal = this.modalService.show(AddEditStaffComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        index,
        data: staff
      }
    });
    modal.content.onClose.subscribe(res => {
      if (res) {
        index !== -1
          ? this.staffs.splice(index, 1, res)
          : this.staffs.push(res)
      }
      modal.hide();
    })
  }

  deleteStaff(id: number, $index: number) {
    const modal = this.modalService.show(ConfirmModalComponent);
    modal.content.onClick.subscribe(res => {
      if (res) {
        this.staffService.deleteStaff(id).subscribe(res => {
          if (res.code === STATUS_CODE.SUCCESS && res.data) {
            this.staffs.splice($index, 1);
          }
        })
      }
      modal.hide();
    })
  }
}

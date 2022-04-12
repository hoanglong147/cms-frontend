import { Injectable } from '@angular/core';
import { IStaffRequest } from 'app/interfaces/serve-request';
import { ApiService } from 'app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(
    private apiServe: ApiService
  ) { }

  createStaff(params: IStaffRequest) {
    return this.apiServe.createStaff(params);
  }
  updateStaff(params: IStaffRequest, id: number) {
    return this.apiServe.updateStaff(params, id);
  }
  deleteStaff(id: number) {
    return this.apiServe.deleteStaff(id);
  }
  getAllStaff() {
    return this.apiServe.getAllStaff();
  }
}

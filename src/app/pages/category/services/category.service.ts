import { Injectable } from '@angular/core';
import { STATUS_CODE } from 'app/constant/constant';
import { ICategoryResponse } from 'app/interfaces/serve-response';
import { ApiService } from 'app/services/api.service';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories = new BehaviorSubject<ICategoryResponse[]>([]);
  constructor(
    private apiService: ApiService
  ) { }

  getAllCategory() {
    if (this.categories.getValue().length === 0) {
      this.loadCategory();
    }
    return this.categories.asObservable();
  }

  loadCategory() {
    this.apiService.getAllCategory().subscribe((res) => {
      if (res.code === STATUS_CODE.SUCCESS) {
        res.data.sort((a, b) => (new Date(b.createdDate)).getTime() - (new Date(a.createdDate).getTime()))
        this.categories.next(res.data);
      }
    })
  }

  createCategory(params: { name: string, active: boolean }) {
    return this.apiService.createCategory(params).pipe(
      map(res => {
        if (res.code === STATUS_CODE.CREATED) {
          const data = this.categories.getValue();
          data.unshift(res.data);
          this.categories.next(data);
          return true;
        }
        return false;
      })
    )
  }

  updateCategory(params: { name: string, active: boolean }, index: number, id: number) {
    return this.apiService.updateCategory(params, id).pipe(
      map(res => {
        if (res.code === STATUS_CODE.CREATED) {
          const data = this.categories.getValue();
          res.data.id = id;
          data.splice(index, 1, res.data);
          this.categories.next(data);
          return true;
        }
        return false;
      })
    )
  }

  deleteCategory(id: number, index: number) {
    return this.apiService.deleteCategory(id).pipe(
      map(res => {
        if (res.code === STATUS_CODE.SUCCESS && res.data) {
          const data = this.categories.getValue();
          data.splice(index, 1);
          this.categories.next(data);
          return true;
        }
        return false;
      })
    )
  }
}

import { Injectable } from '@angular/core';
import { STATUS_CODE } from 'app/constant/constant';
import { ICategoryResponse } from 'app/interfaces/serve-response';
import { ApiService } from 'app/services/api.service';
import { BehaviorSubject } from 'rxjs';

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
        this.categories.next(res.data);
      }
    })
  }
}

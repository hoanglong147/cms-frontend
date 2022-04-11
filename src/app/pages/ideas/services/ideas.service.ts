import { Injectable } from '@angular/core';
import { PAGE_SIZE } from 'app/constant/constant';
import { ApiService } from 'app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class IdeasService {

  constructor(
    private apiService: ApiService
  ) { }

  getSession(params: { key: string, page: number, size: number } = { key: '', page: 0, size: PAGE_SIZE }) {
    return this.apiService.getSession(params);
  }
}

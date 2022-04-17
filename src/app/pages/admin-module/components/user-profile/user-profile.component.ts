import { Component, OnInit } from '@angular/core';
import { IStaffResponse } from 'app/interfaces/serve-response';
import { ApiService } from 'app/services/api.service';
import { HelperService } from 'app/services/helper.service';
import { SubjectService } from 'app/services/subject.service';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'spending-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  unSubscrition: Subscription;
  userProfile$: Observable<IStaffResponse> = {} as Observable<IStaffResponse>;
  loading = true;
  constructor(
    private apiService: ApiService,
    private helperService: HelperService,
    private subjectService: SubjectService
  ) {
    this.unSubscrition = new Subscription();

  }

  ngOnInit(): void {
    const { userId } = this.subjectService.userInfo.getValue();
    this.getUserProfile(userId);
  }
  getUserProfile(id) {
    this.userProfile$ = this.apiService.getUserProfile(id).pipe(
      tap(res => this.helperService.showFullLoading()),
      map(response => response.data),
      tap(res => this.helperService.hideFullLoading())
    );
  }

  onUpdated($event) {
    if ($event) {
      this.helperService.showSuccess('', 'Update success!!!');
    } else {
      this.helperService.showError('', 'Update failed!!!');
    }
  }
}

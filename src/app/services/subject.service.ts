import { Injectable } from '@angular/core';
import { IUser } from 'app/interfaces/model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  loadGeneralAvailbility = new Subject<boolean>();
  fullLoading = new BehaviorSubject<boolean>(false);
  userInfo = new BehaviorSubject<IUser>(null);
  dataFilter = new BehaviorSubject<any>(null);
  userOnlineStatus = new BehaviorSubject<any>(null);
  checkAllLoad = new BehaviorSubject<boolean>(null);
  userProgressProfile = new BehaviorSubject<any>(null);
  checkNoti = new BehaviorSubject<any>(null);
  constructor() { }
}

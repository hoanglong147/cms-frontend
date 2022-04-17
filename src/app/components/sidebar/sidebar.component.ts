import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROLE, STORAGE_KEY } from 'app/constant/constant';
import { IUser } from 'app/interfaces/model';
import { ParamsProviderService } from 'app/services/params-provider.service';
import { SubjectService } from 'app/services/subject.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    id?: number;
    auth: ROLE[];
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '', auth: [ROLE.ADMIN, ROLE.QA] },
    { path: '/ideas', title: 'Feeds ideas', icon: 'nc-book-bookmark', class: '', auth: [ROLE.ADMIN, ROLE.QA, ROLE.STAFF] },
    { path: '/session', title: 'Sessions', icon: 'nc-single-02', class: '', auth: [ROLE.QA] },
    { path: '/category', title: 'Category', icon: 'nc-settings-gear-65', class: '', auth: [ROLE.ADMIN, ROLE.QA] },
    { path: '/staff', title: 'Staffs', icon: 'nc-circle-10', class: '', auth: [ROLE.ADMIN] },
    { path: '/profile', title: 'Profile', icon: 'nc-diamond', class: '', auth: [ROLE.QA, ROLE.STAFF] },
    // { path: '/icons', title: 'Icons', icon: 'nc-diamond', class: '' },
    // { path: '/maps', title: 'Maps', icon: 'nc-pin-3', class: '' },
    // { path: '/notifications', title: 'Notifications', icon: 'nc-bell-55', class: '' },
    // { path: '/table', title: 'Table List', icon: 'nc-tile-56', class: '' },
    // { path: '/typography', title: 'Typography', icon: 'nc-caps-small', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO', icon: 'nc-spaceship', class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit, OnDestroy {
    public menuItems = ROUTES.filter(menuItem => menuItem);
    userInfo: IUser = {} as IUser;
    unSubscription: Subscription;
    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private subjectService: SubjectService,
        private cookieService: CookieService,
        private ppService: ParamsProviderService
    ) {
        this.unSubscription = new Subscription();
    }
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        const info = this.subjectService.userInfo.subscribe((res: IUser) => {
            this.userInfo = res;
            if (!this.userInfo && this.cookieService.get(STORAGE_KEY.USER_INFO)) {
                this.userInfo = JSON.parse(this.cookieService.get(STORAGE_KEY.USER_INFO));
            }
            this.menuItems = ROUTES.filter(route => route.auth.includes(this.userInfo.roles));
        });

        this.unSubscription.add(info);
    }
    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.unSubscription.unsubscribe();
    }
}

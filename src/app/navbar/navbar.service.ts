import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';

import { ResultPagging } from "../shared/model/result-pagging.model";
import { PaggingModel } from "../shared/model/pagging.model";
import { UserSearchParamModel } from "./user-search-param.model";
import { UserModel } from "./user.model";

@Injectable({ providedIn: 'root' })
export class UserService {

    /** chứa thông tin kết quả tìm kiếm và thông tin phân trang */
    resultPagging = new BehaviorSubject<ResultPagging>(null);

    // baseURL: string;

    constructor(
        private http: HttpClient
    ) {
        // this.baseURL = environment.baseURL + environment.apiUser;
    }

    // /** Tạo request tạo user */
    // requestCreate(user: UserModel) {
    //     const url = new URL(environment.baseURL +  'user/changepassword');

    //     return this.http.post<UserModel>(url.href, user);
    // }
    // /**Lấy thông tin chi tiết của 1 user theo id */
    // request(id: number) {
    //     //TODO kiểm tra id hợp lệ
    //     const url = new URL(this.baseURL + '/' + id);

    //     return this.http.get<UserModel>(url.href);
    // }
    // /** Tạo request sửa user */
    requestUpdate(user: UserModel) {
        const url = new URL(environment.baseURL +  '/user/update');

        return this.http.post<UserModel>(url.href, user);
    }

    /** Tạo request chang-password */
    requestChange(user: UserModel) {
        const url = new URL(environment.baseURL + '/user/change-password');
        return this.http.post<UserModel>(url.href, user);
    }

}
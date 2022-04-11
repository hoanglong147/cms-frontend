import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';

import { ResultPagging } from "../shared/model/result-pagging.model";
import { MethodModel } from "../shared/model/method.model";

import { PaggingModel } from "../shared/model/pagging.model";
import { commentSearchParamModel } from "./comment-search-param.model";
import { commentModel } from "./comment.model";

@Injectable({ providedIn: 'root' })
export class commentService {

    /** chứa thông tin kết quả tìm kiếm và thông tin phân trang */
    resultPagging = new BehaviorSubject<ResultPagging>(null);
    methodModel = new BehaviorSubject<MethodModel>(null);
    baseURL: string;

    constructor(
        private http: HttpClient
    ) {
        this.baseURL = environment.baseURL
    }



    /** tạo request tìm kiếm project */
    requestSearch(searchParam: commentSearchParamModel): Observable<MethodModel> {
        //tham số tìm kiếm null là tìm tất cả project
        const url = new URL(this.baseURL+ '/comment');

        for (const [key, value] of Object.entries(searchParam)) {
            if (value
                && value.length > 0
            ) {
                url.searchParams.set(key, value);
            }
        }
        return this.http.get<MethodModel>(url.href).pipe(
            map(methodModel => {
                if (!methodModel) {
                    methodModel = new MethodModel();
                }
                return methodModel;
            })
            , tap(
                methodModel => {
                    if (!methodModel) {
                        methodModel = new MethodModel();
                    }
                    this.methodModel.next(methodModel);
                }
            )
        )
    }

    /** Tạo request tạo comment */
    requestCreate(comments: commentModel) {
        const url = new URL(this.baseURL + '/comment');

        return this.http.post<commentModel>(url.href, comments);
    }
}
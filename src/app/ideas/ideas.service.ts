import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';

import { ResultPagging } from "../shared/model/result-pagging.model";
import { PaggingModel } from "../shared/model/pagging.model";
import { ideasSearchParamModel } from "./ideas-search-param.model";
import { ideasModel } from "./ideas.model";

@Injectable({ providedIn: 'root' })
export class ideasService {

    /** chứa thông tin kết quả tìm kiếm và thông tin phân trang */
    resultPagging = new BehaviorSubject<ResultPagging>(null);

    baseURL: string;

    constructor(
        private http: HttpClient
    ) {
        this.baseURL = environment.baseURL
    }



    /** tạo request tìm kiếm  */
    requestSearch(pagging: PaggingModel, searchParam: ideasSearchParamModel): Observable<ResultPagging> {
        //tham số tìm kiếm null là tìm tất cả ideas
        const url = new URL(this.baseURL + '/ideas');
        if (!pagging.currentPage) {
            pagging.currentPage = 1;
        }
        url.searchParams.set('page', (pagging.currentPage - 1).toString());
        url.searchParams.set('size', pagging.rowPerPage.toString());

        // lấy thông tin ở form để thực hiện request search
        for (const [key, value] of Object.entries(searchParam)) {
            if (value
                && value.length > 0
            ) {
                url.searchParams.set(key, value);
            }
        }

        return this.http.get<ResultPagging>(url.href).pipe(
            map(resultPagging => {
                if (!resultPagging) {
                    resultPagging = new ResultPagging();
                    resultPagging.numFound = 0;
                    resultPagging.start = 0;
                }
                return resultPagging;
            })
            , tap(
                resultPagging => {
                    if (!resultPagging) {
                        resultPagging = new ResultPagging();
                        resultPagging.numFound = 0;
                        resultPagging.start = 0;
                    }
                    pagging.countRow = resultPagging.numFound;
                    pagging.currentPage = resultPagging.start / pagging.rowPerPage + 1;
                    // this.paggingService.pagging.next(pagging);//cập nhật giá trị phân trang sau khi truy vấn tìm kiếm
                    this.resultPagging.next(resultPagging);//cập nhật kết quả tìm kiếm
                }
            )
        )
    }

    /** Tạo request tạo ideas */
    requestCreate(ideas: ideasModel) {
        const url = new URL(this.baseURL);

        return this.http.post<ideasModel>(url.href, ideas);
    }
    /**Lấy thông tin chi tiết của 1 ideas theo id */
    request(id: number) {
        //TODO kiểm tra id hợp lệ
        const url = new URL(this.baseURL + '/' + id);

        return this.http.get<ideasModel>(url.href);
    }
    /** Tạo request sửa ideas */
    // requestUpdate(ideas: ideasModel) {
    //     const url = new URL(this.baseURL + '/' + ideas.id);

    //     return this.http.put<ideasModel>(url.href, ideas);
    // }

    /** Tạo request xóa project */
    // requestDelete(ideas: ideasModel) {
    //     const url = new URL(this.baseURL + '/' + ideas.id);
    //     return this.http.delete<ideasModel>(url.href);
    // }

}
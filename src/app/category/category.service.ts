import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { MethodModel } from "../shared/model/method.model";
import { ResultPagging } from "../shared/model/result-pagging.model";
import { PaggingModel } from "../shared/model/pagging.model";
import { categorySearchParamModel } from "./category-search-param.model";
import { categoryModel } from "./category.model";

@Injectable({ providedIn: 'root' })
export class categoryService {

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
    requestSearch(searchParam: categorySearchParamModel): Observable<MethodModel> {
        //tham số tìm kiếm null là tìm tất cả project
        const url = new URL(this.baseURL + '/category');
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

    /** Tạo request tạo user */
    requestCreate(category: categoryModel) {
        const url = new URL(this.baseURL + '/category');
        return this.http.post<categoryModel>(url.href, category);
    }

    /**Lấy thông tin chi tiết của 1 category theo id */
    request(id: number) {
        //TODO kiểm tra id hợp lệ
        const url = new URL(this.baseURL + '/category/' + id);
        return this.http.get<categoryModel>(url.href);
    }
    /** Tạo request sửa category */
    requestUpdate(category: categoryModel) {
        const url = new URL(this.baseURL + '/category/' +category.id);
        return this.http.put<categoryModel>(url.href, category);
    }

    /** Tạo request xóa project */
    requestDelete(category: categoryModel) {
        const url = new URL(this.baseURL + '/category/' + category.id);
        return this.http.delete<categoryModel>(url.href);
    }

}
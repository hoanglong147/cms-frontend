import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { ResultPagging } from "../shared/model/result-pagging.model";
import { ProjectModel } from "./manage.model";
import { PaggingModel } from "../shared/model/pagging.model";
import { ProjectSearchParamModel } from "./manage-search-param.model";

@Injectable({ providedIn: 'root' })
export class ProjectService {

    /** chứa thông tin kết quả tìm kiếm và thông tin phân trang */
    resultPagging = new BehaviorSubject<ResultPagging>(null);

    constructor(
        private http: HttpClient
    ) { }

    /**Lấy thông tin chi tiết của 1 project theo id */
    request(id: string) {
        //TODO kiểm tra id hợp lệ
        const url = new URL(environment.baseURL + environment.apiProject + '/' + id);

        return this.http.get<ProjectModel>(url.href);
    }

    /** tạo request tìm kiếm project */
    requestSearch(pagging: PaggingModel, searchParam: ProjectSearchParamModel) {
        //tham số tìm kiếm null là tìm tất cả project
        const url = new URL(environment.baseURL + '/departments');

        for (const [key, value] of Object.entries(searchParam)) {
            if (value
                && value.length > 0
            ) {
                url.searchParams.set(key, value);
            }
        }

        if (!pagging.currentPage) {
            pagging.currentPage = 1;
        }

        url.searchParams.set('page', (pagging.currentPage - 1).toString());
        url.searchParams.set('size', pagging.rowPerPage.toString());

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
                    this.resultPagging.next(resultPagging);
                }
            )
        )
    }


    /** Tạo request tạo project */
    requestCreate(project: ProjectModel) {
        const url = new URL(environment.baseURL + environment.apiProject);

        return this.http.post<ProjectModel>(url.href, project);
    }

    /** Tạo request sửa project */
    requestUpdate(project: ProjectModel) {
        const url = new URL(environment.baseURL + environment.apiProject + '/' + project.id);

        return this.http.put<ProjectModel>(url.href, project);
    }

    /** Tạo request xóa project */
    requestDelete(project: ProjectModel) {
        const url = new URL(environment.baseURL + environment.apiProject + '/' + project.id);

        return this.http.delete<ResultPagging>(url.href);
    }
}
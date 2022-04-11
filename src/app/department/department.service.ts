// import { Injectable } from "@angular/core";
// import { BehaviorSubject } from "rxjs";
// import { environment } from 'src/environments/environment';

// import { HttpClient } from '@angular/common/http';
// import { map, tap } from 'rxjs/operators';

// import { ResultPagging } from "../shared/model/result-pagging.model";
// import { departmentModel } from "./department.model";
// import { PaggingModel } from "../shared/model/pagging.model";
// import { departmentSearchParamModel } from "./department-search-param.model";

// @Injectable({ providedIn: 'root' })
// export class departmentService {

//     /** chứa thông tin kết quả tìm kiếm và thông tin phân trang */
//     resultPagging = new BehaviorSubject<ResultPagging>(null);

//     constructor(
//         private http: HttpClient
//     ) { }

//     /**Lấy thông tin chi tiết của 1 department theo id */
//     request(id: string) {
//         //TODO kiểm tra id hợp lệ
//         const url = new URL(environment.baseURL + environment.apidepartment + '/' + id);

//         return this.http.get<departmentModel>(url.href);
//     }

//     /** tạo request tìm kiếm department */
//     requestSearch(pagging: PaggingModel, searchParam: departmentSearchParamModel) {
//         //tham số tìm kiếm null là tìm tất cả department
//         const url = new URL(environment.baseURL + environment.apidepartment);
//         // const pagging = this.paggingService.pagging.getValue();
//         // const startRow: number = (page - 1) * pagging.rowPerPage;

//         for (const [key, value] of Object.entries(searchParam)) {
//             if (value
//                 && value.length > 0
//             ) {
//                 url.searchParams.set(key, value);
//             }
//         }
        
//         if (!pagging.currentPage) {
//             pagging.currentPage = 1;
//         }

//         url.searchParams.set('start', ((pagging.currentPage - 1) * pagging.rowPerPage).toString());
//         url.searchParams.set('rows', pagging.rowPerPage.toString());

//         return this.http.get<ResultPagging>(url.href).pipe(
//             map(resultPagging => {
//                 if (!resultPagging) {
//                     resultPagging = new ResultPagging();
//                     resultPagging.numFound = 0;
//                     resultPagging.start = 0;
//                 }
//                 return resultPagging;
//             })
//             , tap(
//                 resultPagging => {
//                     if (!resultPagging) {
//                         resultPagging = new ResultPagging();
//                         resultPagging.numFound = 0;
//                         resultPagging.start = 0;
//                     }
//                     pagging.countRow = resultPagging.numFound;
//                     pagging.currentPage = resultPagging.start / pagging.rowPerPage + 1;
//                     // this.paggingService.pagging.next(pagging);//cập nhật giá trị phân trang sau khi truy vấn tìm kiếm
//                     this.resultPagging.next(resultPagging);//cập nhật kết quả tìm kiếm
//                 }
//             )
//         )
//     }

//     /** Tạo request tạo department */
//     requestCreate(department: departmentModel) {
//         const url = new URL(environment.baseURL + environment.apidepartment);

//         return this.http.post<departmentModel>(url.href, department);
//     }

//     /** Tạo request sửa department */
//     requestUpdate(department: departmentModel) {
//         const url = new URL(environment.baseURL + environment.apidepartment + '/' + department.id);

//         return this.http.put<departmentModel>(url.href, department);
//     }

//     /** Tạo request xóa department */
//     requestDelete(department: departmentModel) {
//         const url = new URL(environment.baseURL + environment.apidepartment + '/' + department.id);

//         return this.http.delete<ResultPagging>(url.href);
//     }
// }
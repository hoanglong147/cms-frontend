import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategoryResponse, ICommentResponse, IDepartmentResponse, IIdeaDetailResponse, IIdeaResponse, IStaffResponse, IUserAuthResponse, ServerPaginationResponse, ServerResponse } from 'app/interfaces/serve-response';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  login(params) {
    const url = `${environment.apiUrl}user/login`;
    return this.httpClient.post<ServerResponse<IUserAuthResponse>>(url, params);
  }
  register(params) {
    const url = `${environment.apiUrl}user/register`;
    return this.httpClient.post<ServerResponse<IUserAuthResponse>>(url, params);
  }
  getSummary() {
    const url = `${environment.apiUrl}statistic`;
    return this.httpClient.get(url);
  }
  getHistory(params) {
    const url = `${environment.apiUrl}history`;
    return this.httpClient.get(url, { params: params });
  }
  getHistoryType() {
    const url = `${environment.apiUrl}history-type/all`;
    return this.httpClient.get(url);
  }
  createHistory(params) {
    const url = `${environment.apiUrl}history/add`;
    return this.httpClient.post(url, params);
  }
  updateHistory(params) {
    const url = `${environment.apiUrl}history/update`;
    return this.httpClient.post(url, params);
  }
  createHistoryType(params) {
    const url = `${environment.apiUrl}history-type/add`;
    return this.httpClient.post(url, params);
  }
  updateHistoryType(params) {
    const url = `${environment.apiUrl}history-type/update`;
    return this.httpClient.post(url, params);
  }
  deleteHistoryType(id) {
    const url = `${environment.apiUrl}history-type/delete/${id}`;
    return this.httpClient.get(url);
  }
  getHistoryDetail(id) {
    const url = `${environment.apiUrl}history/${id}`;
    return this.httpClient.get(url);
  }
  deleteHistory(id) {
    const url = `${environment.apiUrl}history/delete/${id}`;
    return this.httpClient.get(url);
  }
  getProfile() {
    const url = `${environment.apiUrl}user/profile`;
    return this.httpClient.get(url);
  }
  updateProfile(params) {
    const url = `${environment.apiUrl}user/profile/update`;
    return this.httpClient.post(url, params);
  }
  getUserProfile(id) {
    const url = `${environment.apiUrl}user/profile/${id}`;
    return this.httpClient.get(url);
  }
  getNotification(params) {
    const url = `${environment.apiUrl}notification`;
    return this.httpClient.get(url, { params: params });
  }
  signNotification() {
    const url = `${environment.apiUrl}notification/read`;
    return this.httpClient.get(url);
  }
  search(params) {
    const url = `${environment.apiUrl}user/search`;
    return this.httpClient.get(url, { params: params });
  }
  uploadImage(params) {
    const url = `${environment.apiUrl}uploadFile`;
    return this.httpClient.post(url, params);
  }

  // cms
  getSession(params) {
    const url = `${environment.apiUrl}departments`;
    return this.httpClient.get<ServerResponse<ServerPaginationResponse<IDepartmentResponse>>>(url, { params });
  }
  getAllCategory() {
    const url = `${environment.apiUrl}category`;
    return this.httpClient.get<ServerResponse<ICategoryResponse[]>>(url);
  }
  createCategory(params: any) {
    const url = `${environment.apiUrl}category`;
    return this.httpClient.post<ServerResponse<ICategoryResponse>>(url, params);
  }
  updateCategory(params: any, id: number) {
    const url = `${environment.apiUrl}category/${id}`;
    return this.httpClient.put<ServerResponse<ICategoryResponse>>(url, params);
  }
  deleteCategory(id: number) {
    const url = `${environment.apiUrl}category/${id}`;
    return this.httpClient.delete<ServerResponse<boolean>>(url);
  }
  createIdea(params: FormData) {
    const url = `${environment.apiUrl}ideas/upload`;
    return this.httpClient.post<ServerResponse<IIdeaResponse>>(url, params);
  }
  getIdeas(params: any) {
    const url = `${environment.apiUrl}ideas`;
    return this.httpClient.get<ServerResponse<ServerPaginationResponse<IIdeaResponse>>>(url, { params });
  }
  updateSession(params: any, id: number) {
    const url = `${environment.apiUrl}departments/${id}`;
    return this.httpClient.put<ServerResponse<IDepartmentResponse>>(url, params);
  }
  createSession(params: any) {
    const url = `${environment.apiUrl}departments`;
    return this.httpClient.post<ServerResponse<IDepartmentResponse>>(url, params);
  }
  createStaff(params: any) {
    const url = `${environment.apiUrl}staff`;
    return this.httpClient.post<ServerResponse<IStaffResponse>>(url, params);
  }
  updateStaff(params: any, id: number) {
    const url = `${environment.apiUrl}staff/${id}`;
    return this.httpClient.put<ServerResponse<IStaffResponse>>(url, params);
  }
  deleteStaff(id: number) {
    const url = `${environment.apiUrl}staff/${id}`;
    return this.httpClient.delete<ServerResponse<boolean>>(url);
  }
  getAllStaff() {
    const url = `${environment.apiUrl}staff`;
    return this.httpClient.get<ServerResponse<IStaffResponse[]>>(url);
  }
  getDetailIdea(params: { ideaId: number, page: number, size: number }) {
    const url = `${environment.apiUrl}ideas/detail`;
    return this.httpClient.get<ServerResponse<IIdeaDetailResponse>>(url, { params });
  }

  postComment(params: ICommentResponse) {
    const url = `${environment.apiUrl}comment`;
    return this.httpClient.post<ServerResponse<ICommentResponse>>(url, params);
  }
  likeIdea(param) {
    const url = `${environment.apiUrl}like/change-status`;
    return this.httpClient.post(url, param);
  }
}


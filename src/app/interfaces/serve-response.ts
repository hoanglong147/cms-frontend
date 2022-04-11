import { ROLE } from "app/constant/constant";

export interface ServerResponse<T> {
  data: T;
  success: boolean;
  code: number;
  error: string;
}

export interface ServerPaginationResponse<T> {
  items: T[];
  total: number;
}

export interface IUserAuthResponse {
  token: string;
  username: string;
  email: string;
  roles: ROLE
}

export interface IDepartmentResponse {
  id: number;
  name: string;
  qaName: string;
  startDate: string;
  closureDateIdea: string;
  clouserDate: string;
}

export interface ICategoryResponse {
  createdDate: string;
  name: string;
  active: boolean;
  id: number;
}
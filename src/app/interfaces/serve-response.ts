import { ROLE } from "app/constant/constant";

export interface ServerResponse<T> {
  data: T;
  success: boolean;
  code: number;
  error: string;
}

export interface IUserAuthResponse {
  token: string;
  username: string;
  email: string;
  role: ROLE
}
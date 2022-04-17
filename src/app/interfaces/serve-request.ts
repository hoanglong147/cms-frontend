import { ICommentResponse } from "./serve-response";

export interface IStaffRequest {
  username: string;
  name: string;
  password: string;
  email: string;
  position: string;
  address: string;
  role: number;
}

export interface ISessionRequest {
  name: string;
  startDate: string;
  closureDateIdea: string;
  closureDate: string;
  id: number;
}

export type ICommentRequest = Omit<ICommentResponse, 'staffName'>;

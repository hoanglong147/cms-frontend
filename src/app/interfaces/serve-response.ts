import { LikeStatus, ROLE } from "app/constant/constant";

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
  roles: ROLE;
  userId: number;
}

export interface IDepartmentResponse {
  id: number;
  name: string;
  qaName: string;
  startDate: string;
  closureDateIdea: string;
  closureDate: string;
}

export interface ICategoryResponse {
  createdDate: string;
  name: string;
  active: boolean;
  id: number;
}

export interface IIdeaResponse {
  ideaId: number;
  timeUp: string;
  description: string;
  staffId: number;
  departmentId: number;
  totalLike: number;
  totalComment: number;
  status: number;
  name: string;
  url: string;
  likeStatus: LikeStatus;
  totalDislike: number;
}

export interface IStaffResponse {
  staffId: number;
  position: string;
  userId: number;
  name: string;
  address: string;
  role: number;
  email: string;
  username: string;
}

export interface IIdeaDetailResponse {
  ideaId: number;
  detailComment: { items: ICommentResponse[], total: number };
  totalLike: number;
  totalDislike: number;
  totalComment: number;
  description: string;
  ideaName: string;
  url: string;
  likeStatus: LikeStatus;
}

export interface ICommentResponse {
  content: string;
  anonymous: boolean;
  staffId: number;
  ideaId: number;
  staffName: string;
}



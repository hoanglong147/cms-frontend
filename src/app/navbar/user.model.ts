export class UserModel {
    id: number;
    name:string;
    username:string;
    address: string;
    email: string;
    oldPassword: string;
    newPassword: string;
    /** không có trong request và response */
  statusName: string;
    constructor(
     // public username: string  //thông tin có thể lấy từ token
    ) { }
  }

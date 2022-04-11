export class departmentSearchParamModel {

    departmentId: string;
    departmentName: string;
    status: string;
    mlType: string;
    createdUser: string;//username
    createdTimeFrom: number;
    createdTimeTo: number;
  
    constructor() {
    }
  
    /** set giá trị từ form value */
    build(formValue: {}): departmentSearchParamModel {
      const searchParam = new departmentSearchParamModel();
      if (!formValue) {
        return searchParam;
      }
  
      for (let key in formValue) {
        searchParam[key] = formValue[key];
      }
  
      return searchParam;
    }
  }
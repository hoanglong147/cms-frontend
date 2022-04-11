export class commentSearchParamModel {
  
  ideaId: string;
  staffId: string;
  anonymous: number;
  content: string;
  constructor() {
  }

  /** set giá trị từ form value */
  build(formValue: {}): commentSearchParamModel {
    const searchParam = new commentSearchParamModel();
    if (!formValue) {
      return searchParam;
    }

    // for (const [key, value] of Object.entries(searchParam)) { }
    for (let key in formValue) {
      searchParam[key] = formValue[key];
    }

    return searchParam;
  }
}
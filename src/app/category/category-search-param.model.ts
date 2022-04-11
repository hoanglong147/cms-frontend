export class categorySearchParamModel {
  
  constructor() {
  }

  /** set giá trị từ form value */
  build(formValue: {}): categorySearchParamModel {
    const searchParam = new categorySearchParamModel();
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
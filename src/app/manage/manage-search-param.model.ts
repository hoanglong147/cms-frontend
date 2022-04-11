export class ProjectSearchParamModel {

  key: string;
  constructor() {
  }

  /** set giá trị từ form value */
  build(formValue: {}): ProjectSearchParamModel {
    const searchParam = new ProjectSearchParamModel();
    if (!formValue) {
      return searchParam;
    }

    for (let key in formValue) {
      searchParam[key] = formValue[key];
    }

    return searchParam;
  }
}
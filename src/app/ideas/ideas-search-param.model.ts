export class ideasSearchParamModel {
  // timeUp: string;
  // description: string;
  // staffId: string;
  // categoryId: string;
  departmentId: string;
  // likesList: string;
  // ideasList: string;
  // totalLike: string;
  // totalideas: string;
  constructor() {
  }

  /** set giá trị từ form value */
  build(formValue: {}): ideasSearchParamModel {
    const searchParam = new ideasSearchParamModel();
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
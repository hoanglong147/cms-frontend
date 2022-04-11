export const environment = {
  production: false
  // , baseURL: 'http://26.28.156.195:8080'
  , baseURL: 'http://26.58.101.13:8080'

  , api: '/api'
  //khi sửa ở đây thì phải sửa ở file prod
  , apiLogin: '/user/login'
  , apiProject: '/api/projects'
  , apiDataset: '/api/projects/:prj_id/datasets'//phải replace ':prj_id' trước khi dùng
  , apiDatasetDetail: '/api/projects/:prj_id/datasets/:dataset_id'//phải replace ':prj_id', ':dataset_id' trước khi dùng
  , apiItemRuleSet: '/api/projects/:prj_id/item-rule-sets'//phải replace ':prj_id' trước khi dùng
  , apiFeatureSet: '/api/projects/:prj_id/feature-sets'//phải replace ':prj_id' trước khi dùng
  , apiFeatureSetResult: '/api/projects/:prj_id/feature-set-results'//phải replace ':prj_id' trước khi dùng
  , apiModel: '/api/projects/:prj_id/models'//phải replace ':prj_id' trước khi dùng
  , apiEvaluation: '/api/projects/:prj_id/evaluations'//phải replace ':prj_id' trước khi dùng
  , apiUser: '/api/users'
  //api meta other
  , apiMetaAlgorithm: '/api/projects/:prj_id/meta/algorithms'
  , apiMeta: '/api/meta'
  , apiProjectMeta: '/api/projects/:prj_id/meta'
  , apiMetaFeatureParam: '/api/meta/feature-params'
};

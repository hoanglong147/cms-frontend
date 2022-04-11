import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { ProjectComponent } from './manage/manage.component';
import { departmentComponent } from './department/department.component';
import { LoginGuard } from './shared/login-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/manage', pathMatch: 'full' },
  {
    path: 'manage'
     , canActivate: [LoginGuard]//nếu chưa đăng nhập thì chuyển hướng đến login
    , component: ProjectComponent
    // , resolve: [MetaSearchResolverService]//đảm bảo có đủ meta trước khi search
  },

  { path: 'manage/:idManage', redirectTo: '/manage/:idManage/department', pathMatch: 'full' },
  {
    path: 'manage/:idManage/department'
    , canActivate: [LoginGuard]//nếu chưa đăng nhập thì chuyển hướng đến login
    , component: departmentComponent
  },
  // { path: 'department', component: departmentComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'not-found'
    , component: ErrorPageComponent
    , data: { message: 'Page not found!' }
  },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

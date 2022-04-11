import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { ProjectService } from './manage/manage.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProjectComponent } from './manage/manage.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginInterceptorService } from './login/login-interceptor.service';
import { PaggingComponent } from './pagging/pagging.component';
import { DatePipe } from '@angular/common';
import { departmentComponent } from './department/department.component';
import { SidebarComponent } from './sidebar/sidebar.component';
//import { FilterPipe } from './navbar/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProjectComponent,
    departmentComponent,
    SidebarComponent,
    NavbarComponent,
    PaggingComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule
    , AppRoutingModule, HttpClientModule
    , FormsModule, NgbModule
    , DlDateTimeDateModule, DlDateTimePickerModule // date time picker
  ],
  providers: [
    DatePipe
    , ProjectService
    , {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

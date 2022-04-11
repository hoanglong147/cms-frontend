import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CookieService } from "ngx-cookie-service";
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { AppComponent } from './app.component';
import { AuthGuard } from "./auth.guard";
import { CommonInterceptor } from "./common.interceptor";
import { DirectivesModule } from "./directives/directives.module";
import { GlobalErrorHandler } from "./global-error-handler";
import { PipesModule } from "./pipes/pipes.module";
import { SharedModule } from "./shared/shared/shared.module";





@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      enableHtml: true,
      positionClass: "toast-top-right"
    }),
    DirectivesModule,
    PipesModule,
    HttpClientModule,
    FontAwesomeModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    CookieService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: CommonInterceptor,
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

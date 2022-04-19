import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from 'app/shared/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CountDownComponent } from './count-down/count-down.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';



@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    CountDownComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    CountDownComponent
  ]
})
export class ComponentsModule { }

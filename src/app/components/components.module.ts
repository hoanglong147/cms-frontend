import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from 'app/shared/shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    FooterComponent,
    NavbarComponent
  ]
})
export class ComponentsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { ComponentsModule } from 'app/components/components.module';
import { SharedModule } from 'app/shared/shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    StaffComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: StaffComponent }
    ])
  ]
})
export class StaffModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { ComponentsModule } from 'app/components/components.module';
import { SharedModule } from 'app/shared/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AddEditStaffComponent } from './components/add-edit-staff/add-edit-staff.component';



@NgModule({
  declarations: [
    StaffComponent,
    AddEditStaffComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: StaffComponent }
    ])
  ],
  exports: [
    AddEditStaffComponent
  ]
})
export class StaffModule { }

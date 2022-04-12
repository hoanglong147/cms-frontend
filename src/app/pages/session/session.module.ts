import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionComponent } from './session.component';
import { ComponentsModule } from 'app/components/components.module';
import { SharedModule } from 'app/shared/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AddEditSessionComponent } from './components/add-edit-session/add-edit-session.component';



@NgModule({
  declarations: [
    SessionComponent,
    AddEditSessionComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: SessionComponent }
    ])
  ]
})
export class SessionModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeasComponent } from './ideas.component';
import { ComponentsModule } from 'app/components/components.module';
import { SharedModule } from 'app/shared/shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    IdeasComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: IdeasComponent }
    ])
  ]
})
export class IdeasModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { ComponentsModule } from 'app/components/components.module';
import { SharedModule } from 'app/shared/shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: CategoryComponent }
    ])
  ]
})
export class CategoryModule { }

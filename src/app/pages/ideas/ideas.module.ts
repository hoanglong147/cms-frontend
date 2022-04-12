import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeasComponent } from './ideas.component';
import { ComponentsModule } from 'app/components/components.module';
import { SharedModule } from 'app/shared/shared/shared.module';
import { RouterModule } from '@angular/router';
import { LayoutSessionComponent } from './components/layout-session/layout-session.component';
import { SessionItemComponent } from './components/session-item/session-item.component';
import { LayoutIdeasComponent } from './components/layout-ideas/layout-ideas.component';
import { IdeaItemComponent } from './components/idea-item/idea-item.component';
import { IdeaDetailComponent } from './components/idea-detail/idea-detail.component';
import { CreateIdeaComponent } from './components/create-idea/create-idea.component';
import { FilterIdeasListComponent } from './components/filter-ideas-list/filter-ideas-list.component';



@NgModule({
  declarations: [
    IdeasComponent,
    LayoutSessionComponent,
    SessionItemComponent,
    LayoutIdeasComponent,
    IdeaItemComponent,
    IdeaDetailComponent,
    CreateIdeaComponent,
    FilterIdeasListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: IdeasComponent, children: [
          { path: '', component: LayoutSessionComponent },
          { path: ':sessionId', component: LayoutIdeasComponent },
          { path: ':sessionId/detail/:id', component: IdeaDetailComponent },
        ]
      }
    ])
  ]
})
export class IdeasModule { }

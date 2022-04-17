import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarPlus, faEnvelope, far, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faCameraRetro, faCircle, faCity, faClock, faCoffee, faCreditCard, faEdit, faEye, faFrown, faGlobeAsia, faMapMarkedAlt, faPen, faPlus, fas, faSmile, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgSelectModule } from '@ng-select/ng-select';
import { AdminLayoutComponent } from 'app/layouts/admin-layout/admin-layout.component';
import { FixedPluginModule } from 'app/components/fixedplugin/fixedplugin.module';
import { SharedModule } from 'app/shared/shared/shared.module';
import { AdminRoutes } from './admin.routing';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IconsComponent } from './components/icons/icons.component';
import { MapsComponent } from './components/maps/maps.component';
import { NotesComponent } from './components/notes/notes.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TableComponent } from './components/table/table.component';
import { TypographyComponent } from './components/typography/typography.component';
import { UpgradeComponent } from './components/upgrade/upgrade.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserComponent } from './components/user/user.component';
import { ComponentsModule } from 'app/components/components.module';
import { StaffModule } from '../staff/staff.module';





@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    SharedModule,
    FixedPluginModule,
    ComponentsModule,
    StaffModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    NotesComponent,
    SettingsComponent,
    AdminLayoutComponent,
    UserProfileComponent
  ]
})

export class AdminModule {
  constructor() {

  }
}

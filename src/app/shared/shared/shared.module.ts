import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarPlus, faCircle, faClock, faCreditCard, faEdit, faEnvelope, faEye, faFrown, far, faSmile, faTimesCircle, faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faCameraRetro, faCity, faCoffee, faGlobeAsia, faMapMarkedAlt, faPaperclip, faPen, faPlus, fas, faTimes, faTrash, faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DirectivesModule } from 'app/directives/directives.module';
import { PipesModule } from 'app/pipes/pipes.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    NgxPaginationModule,
    CollapseModule,
    ColorPickerModule,
    DirectivesModule,
    BsDropdownModule.forRoot(),
    PipesModule,
    NgSelectModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
    AngularSvgIconModule.forRoot()
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    NgxPaginationModule,
    CollapseModule,
    ColorPickerModule,
    DirectivesModule,
    BsDropdownModule,
    PipesModule,
    NgSelectModule,
    FontAwesomeModule,
    ModalModule,
    AngularSvgIconModule
  ]
})
export class SharedModule {
  constructor(private library: FaIconLibrary) {
    this.library.addIconPacks(fas, far);
    this.library.addIcons(faPlus, faCoffee, faCircle, faPen, faTrash,
      faEdit, faEye, faTimes, faSmile, faFrown, faCreditCard, faClock, faThumbsDown, faThumbsUp,
      faMapMarkedAlt, faCity, faGlobeAsia, faEnvelope, faCameraRetro, faPaperclip, faCloudDownloadAlt);
    this.library.addIcons(faTimesCircle, faCalendarPlus)
  }
}

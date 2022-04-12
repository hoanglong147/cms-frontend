import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ColorPickerModule } from 'ngx-color-picker';
import { DirectivesModule } from 'app/directives/directives.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PipesModule } from 'app/pipes/pipes.module';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { far, faCircle, faEdit, faEye, faSmile, faFrown, faCreditCard, faClock, faEnvelope, faTimesCircle, faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import { fas, faPlus, faCoffee, faPen, faTrash, faTimes, faMapMarkedAlt, faCity, faGlobeAsia, faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { ModalModule } from 'ngx-bootstrap/modal';



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
    BsDropdownModule,
    PipesModule,
    NgSelectModule,
    FontAwesomeModule,
    ModalModule.forRoot()
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
    ModalModule
  ]
})
export class SharedModule {
  constructor(private library: FaIconLibrary) {
    this.library.addIconPacks(fas, far);
    this.library.addIcons(faPlus, faCoffee, faCircle, faPen, faTrash,
      faEdit, faEye, faTimes, faSmile, faFrown, faCreditCard, faClock,
      faMapMarkedAlt, faCity, faGlobeAsia, faEnvelope, faCameraRetro);
    this.library.addIcons(faTimesCircle, faCalendarPlus)
  }
}

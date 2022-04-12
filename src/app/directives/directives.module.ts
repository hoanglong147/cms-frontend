import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinButtonDirective } from './spin-button.directive';
import { NumberOnlyDirective } from './number-only.directive';
import { FormsModule } from '@angular/forms';
import { InputMaxLengthDirective } from './input-max-length.directive';
import { FileHandleDirective } from './file-handle.directive';



@NgModule({
  declarations: [SpinButtonDirective, NumberOnlyDirective, InputMaxLengthDirective, FileHandleDirective],
  imports: [
    CommonModule
  ],
  exports: [
    SpinButtonDirective,
    NumberOnlyDirective,
    InputMaxLengthDirective,
    FileHandleDirective
  ]
})
export class DirectivesModule { }

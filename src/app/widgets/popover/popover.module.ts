import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverDirective } from './popover.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { PopupDirective } from './popup.directive';



@NgModule({
  declarations: [PopoverDirective, PopupDirective],
  imports: [
    CommonModule,
    OverlayModule,
  ],
  exports: [
    PopoverDirective, PopupDirective
  ]
})
export class PopoverModule { }

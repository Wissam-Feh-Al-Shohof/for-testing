import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverDirective } from './popover.directive';
import { OverlayModule } from '@angular/cdk/overlay';



@NgModule({
  declarations: [PopoverDirective],
  imports: [
    CommonModule,
    OverlayModule,
  ],
  exports: [
    PopoverDirective
  ]
})
export class PopoverModule { }

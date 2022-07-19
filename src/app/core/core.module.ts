import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { VisibleDirective } from './visible/visible.directive';


@NgModule({
  declarations: [VisibleDirective],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports: [VisibleDirective]
})
export class CoreModule { }

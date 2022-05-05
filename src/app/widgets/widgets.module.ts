import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
import { AppPopUpComponent } from './components/app-pop-up/app-pop-up.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';



@NgModule({
  declarations: [SelectComponent, AppPopUpComponent, MenuItemComponent],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports:[SelectComponent, AppPopUpComponent, MenuItemComponent ]
})
export class WidgetsModule { }

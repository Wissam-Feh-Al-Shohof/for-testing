import { Overlay } from '@angular/cdk/overlay';
import { Component, ContentChildren, OnInit, QueryList, AfterContentInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'app-pop-up',
  templateUrl: './app-pop-up.component.html',
  styleUrls: ['./app-pop-up.component.scss']
})
export class AppPopUpComponent implements OnInit, AfterContentInit, OnDestroy {
  // popUp!: OverlayRef;
  @Input('title') title!: string;
  @ContentChildren(MenuItemComponent) menuItems!: QueryList<MenuItemComponent>;
  isOpen = false;
  model: any;
  subs = new Subscription();
  constructor(private overlay: Overlay) { }
  ngOnInit(): void {
    //  this.popUp =  this.overlay.create()
  }
  ngAfterContentInit() {


    this.subs.add(this.menuItems.forEach(ele => ele.click.subscribe((value: string) => {
      this.model = value;
      this.isOpen = false;
    })))

  }
  ngOnDestroy() {
    this.subs.unsubscribe();
    this.model = '';
  }

}

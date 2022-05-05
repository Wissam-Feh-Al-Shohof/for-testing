import { Component,  OnInit, AfterContentInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent  implements OnInit, AfterContentInit {
  @Output('click') click : EventEmitter<string>= new EventEmitter();
  constructor() {  }

  ngOnInit(): void {
  }
  ngAfterContentInit(): void {

  }
  onClicked(event:any) {
    this.click.emit(event.currentTarget.innerHTML)
  }
}

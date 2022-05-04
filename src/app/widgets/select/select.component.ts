import { Component, ContentChildren, DoCheck, OnInit, AfterContentInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, AfterContentInit {
  myOptions:any = [];
  @ContentChildren('p') options: ElementRef[] =[];
  constructor() { }
  ngAfterContentInit(): void {
    this.myOptions =  this.options.map(ele => ele.nativeElement.innerHTML);

  }

  ngOnInit(): void {
  }


}

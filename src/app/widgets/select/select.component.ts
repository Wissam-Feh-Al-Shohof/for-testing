import { Component, ContentChildren, DoCheck, OnInit, AfterContentInit, ElementRef, QueryList, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, AfterContentInit, OnDestroy {
  myOptions: ElementRef<HTMLElement>[] = [];
  @ContentChildren('p') options!: QueryList<ElementRef<HTMLElement>>;
  constructor() { }

  private _destroy$ = new Subject();
  ngAfterContentInit(): void {
    this.myOptions = Array.from(this.options);
    debugger;
    this.options.changes.pipe(
      takeUntil(this._destroy$)
    ).subscribe((newOptions: ElementRef<HTMLElement>[]) => {
      debugger;
      this.myOptions = newOptions;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }
}

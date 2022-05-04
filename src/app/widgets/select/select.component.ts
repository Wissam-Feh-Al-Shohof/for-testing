import { Component, ContentChildren, DoCheck, OnInit, AfterContentInit, ElementRef, QueryList, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, AfterContentInit, OnDestroy {
  @ContentChildren('p') options!: QueryList<ElementRef<HTMLElement>>;
  constructor() { }

  private _destroy$ = new Subject();
  ngAfterContentInit(): void {
    debugger;
    this.options.changes.pipe(
      takeUntil(this._destroy$)
    ).subscribe((newOptions: ElementRef<HTMLElement>[]) => {
      // do something when content changes
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}

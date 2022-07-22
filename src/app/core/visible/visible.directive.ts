import {
  coerceBooleanProperty,
  coerceNumberProperty,
} from '@angular/cdk/coercion';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { defer, Subject } from 'rxjs';
import { share, switchMap, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[visible]',
})
export class VisibleDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Output() visible: EventEmitter<string> = new EventEmitter<string>();

  /** if true, observe the first intersection and unobserve
   *
   * @default `false
   */
  @Input() set observeOnce(value: boolean | string | undefined | number) {
    // we need to accept `string`, `number`, `boolean` and `undefined`
    this._observeOnce = coerceBooleanProperty(value);
  }
  get observeOnce() {
    return this._observeOnce;
  }
  /** internal value for `observeOnce` */
  private _observeOnce = false;

  /** at which visibility ratio should the event be emitted */
  @Input() set visibleRatio(value: string | number) {
    this._visibleRatio = coerceNumberProperty(value);
  }
  get visibleRatio() {
    return this._visibleRatio;
  }
  /** internal value for `visibleRatio` */
  private _visibleRatio = 0;

  private _observe$ = new Subject();
  private readonly _destroy$ = new Subject();

  constructor(private _host: ElementRef) {
    /** we should not execute stuff in the constructor, because stuff has not been initialized yet */
  }


  ngOnChanges(changes: Record<keyof VisibleDirective, SimpleChange>): void {
    if(changes['visibleRatio']){
      this._handleVisibleRatioChange();
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this._handleObserve();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }


  private _handleObserve(){
    this._observe$.pipe(
      takeUntil(this._destroy$),
      switchMap(() => this._onVisible$(this._host.nativeElement))
    ).subscribe(() => this.visible.emit());

    this._observe$.next();
  }

  private _onVisible$(element: HTMLElement) {
    const io$ = new Subject();
    const options: IntersectionObserverInit = {
      threshold: this._visibleRatio,
    };

    return defer(() => {
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            if (entry.intersectionRatio < this.visibleRatio) return;
            io$.next();
            if (this.observeOnce) {
              io.disconnect();
              io$.complete();
            }
          }),
        options
      );

      io.observe(element);
      return io$;
    });
  }

  private _handleVisibleRatioChange(){
    this._observe$.next();
  }
}

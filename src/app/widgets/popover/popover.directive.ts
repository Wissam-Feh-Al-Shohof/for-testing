import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appPopover]'
})
export class PopoverDirective implements OnInit, OnChanges, OnDestroy {

  /** the template to be rendered in the overlay */
  @Input() appPopover?: TemplateRef<any>;

  constructor(
    /** the host element for this directive */
    private _host: ElementRef,

    /** the CDK Overlay service, allows us to create overlays */
    private _overlay: Overlay,

    /** `ViewContainerRef` of this directive, needed to create the template portal */
    private _vcRef: ViewContainerRef,
  ) { }


  /** used to cancel subscriptions when this directive is destroyed */
  private _destroy$ = new Subject();

  private readonly _overlayPositionStrategy = 
    this._overlay
      .position()
      .flexibleConnectedTo(this._host)
      .withPositions([{
        originX: 'center', originY: 'bottom',
        overlayX: "center", overlayY: 'top'
      }]);

  /** the overlay ref,
   * the overlay is created on initialization, and only attached/detached on demand
   * this offers far better performance.
   * 
   * instead of attach/detach, we can also just set `display: none` and
   * `display: block` on the overlay panel. This would offer even
   * better performance
   */
  private readonly _overlayRef = this._overlay.create({
    positionStrategy: this._overlayPositionStrategy,
    hasBackdrop: false,
  });


  /** the template portal of the overlay content.
   * We create this only when the template changes and not on each overlay
   * attach.
   */
  private _templatePortal?: TemplatePortal;

  /** whether the overlay is opened or not */
  private _isOverlayOpen = false;



  /**
   * emits when the host element is clicked, for instance if the directive was applied like:
   * ```html
   * <button appPopover></button>
   * ```
   * then the host element would be the button `HTMLElement`
   */
   private readonly _hostClicked$ = fromEvent<MouseEvent>(this._host.nativeElement, "click");

   /** emits whenever the user clicks outside the overlay (but not on the host element) */
   private readonly _outsideClick$ = this._overlayRef.outsidePointerEvents().pipe(
     filter(evt => evt.target !== this._host.nativeElement)
   );

  ngOnInit(): void {
    //  open the overlay when the host element is clicked
    this._hostClicked$.pipe(
      takeUntil(this._destroy$)
    ).subscribe(evt => {
      // The overlay is closed for any click outside the overlay panel,
      // therefor we do not close it here
      if(this._isOverlayOpen) return this._closeOverlay();

      // if the overlay is not opened, and the user clicks the host then we open it
      this._openOverlay();
    });

    // close overlay when the user clicks outside
    this._outsideClick$.pipe(
      takeUntil(this._destroy$),
    ).subscribe(evt => {
      // any click outside the overlay panel, including clicking the host element,
      // will close the overlay
      this._closeOverlay();
    })
  }

  ngOnChanges(changes: Record<keyof typeof this, SimpleChange>): void {
    if(changes['appPopover']){
      // whenever the template changes we need to handle these changes
      this._handleTemplateChanged();
    }
  }

  ngOnDestroy(): void {
    /** cancel open subscriptions */
    this._destroy$.next();
    /** cancel any accidental subscription to `this._destroy$` */
    this._destroy$.complete();
  }


  /** handle changes to the overlay template
   * 
   * each time the template changes, we need to cache the resulting template portal
   */
  private _handleTemplateChanged(){
    // detach any previous template portal
    this._templatePortal?.detach();
    // remove the old template portal
    this._templatePortal = undefined;

    // if the new value is a template, then create the new template portal
    if(this.appPopover) this._templatePortal = new TemplatePortal(this.appPopover, this._vcRef);
  }

  /** handles closing the overlay */
  private _closeOverlay(){

    // detach the template portal from the overlay
    this._overlayRef.detach();
    this._isOverlayOpen = false;
  }


  /** handles opening the overlay */
  private _openOverlay(){
    // guard `_templatePortal` is defined
    if(!this._templatePortal) return ;

    // attach the template portal to the overlay ref
    this._overlayRef.attach(this._templatePortal);
    this._isOverlayOpen = true;
  }
}

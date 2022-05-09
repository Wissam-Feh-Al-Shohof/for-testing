import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef, PositionStrategy } from "@angular/cdk/overlay";
import { Attribute, Directive, ElementRef, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChange, TemplateRef, ViewContainerRef } from "@angular/core";
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Directive({
  selector:'[popup]'
})
export class PopupDirective implements OnDestroy, OnInit, OnChanges {

  @Input('popup') popup! : TemplateRef<any>;
  isOverlayOpen = false;
  private _destroy$ = new Subject();
  private _templatePortal?: TemplatePortal;
  private readonly _positionStrategy: PositionStrategy = this.overlay
  .position()
  .flexibleConnectedTo(this._host)
  .withPositions([{originX:'center',originY:'bottom',overlayX:'center',overlayY:'top'}]);

  private _overlayRef:OverlayRef = this.overlay.create({
    positionStrategy:this._positionStrategy,
    hasBackdrop:false});
    constructor(
      // @Attribute('popup') public popup:TemplateRef<any>,
      private _host:ElementRef,
      private overlay:Overlay,
      private vcr: ViewContainerRef ) { }
      private _clickedOutSide$ = this._overlayRef._outsidePointerEvents;
      ngOnInit(): void {
    if(this._templatePortal){

     this._clickedOutSide$.pipe(takeUntil(this._destroy$),filter(evt => evt.target !== this._host.nativeElement)).subscribe(event => {
       this.hideOverlay()
      })
      // this._overlayRef.attach(this._templatePortal);
    }
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }


  ngOnChanges(changes: Record<keyof PopupDirective, SimpleChange>): void {
    if(changes['popup']){
      // whenever the template changes we need to handle these changes
      this._handleTemplateChanged();
    }
  }
  _handleTemplateChanged() {
    debugger ;if(this.popup) this._templatePortal = new TemplatePortal(this.popup, this.vcr);


  }

@HostListener('click') clicked()  {
// this.viewOverlay();
this.isOverlayOpen ? this.hideOverlay() : this.viewOverlay();




}
hideOverlay() {
// this._destroy$.next('closed');
this.isOverlayOpen =false;
  this._overlayRef.addPanelClass('hidden');

}
viewOverlay = () => {
  this.isOverlayOpen = true;
  this._overlayRef.attach(this._templatePortal);
  this.viewOverlay = () => {
    this.isOverlayOpen = true;

    this._overlayRef.removePanelClass('hidden');
  }

}
}




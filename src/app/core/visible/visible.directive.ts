import { Directive, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Directive({
  selector: '[appVisible]'
})
export class VisibleDirective {

  @Output('appVisible') visible : EventEmitter<string> = new EventEmitter<string>();
  @Input('hadObserved') hadObserved: Function = new Function();
  entriesObserved: IntersectionObserverEntry [] = [];

  constructor(private _host:ElementRef) {
    console.log('visible')

    this.observe(_host.nativeElement);
   }

   observe(host: any) {
     const observer = new IntersectionObserver(this._onObserved,{
       root: null,//Reflect.get(host,'parentElement') ??
       threshold:1.0,
     });
     observer.observe(host);

   }
  _onObserved = (entries: IntersectionObserverEntry[],observer:IntersectionObserver) => {
    entries.forEach(entry => {
      this.entriesObserved.find(currEntry =>currEntry.target.id === entry.target.id) ?
      this.onObserving(entry) : this.initObservingList(entry);

    });

  }
  initObservingList(entry:IntersectionObserverEntry) {
    this.entriesObserved.push(entry);


  }
  onObserving = (entry:IntersectionObserverEntry) => {
    this.visible.emit(entry.target.id);
    this.onObserving =  (entry) => {
      this.hadObserved();
    }
  }

}

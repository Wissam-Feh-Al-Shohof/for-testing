import { AfterContentInit, AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit , AfterContentInit, DoCheck {
  title = 'CV';
  showRoute = false;
  constructor(private route:Router ){
  }
  ngDoCheck(): void {
    this.route.url === '/test' ? this.showRoute = true :null;
  }
  ngAfterContentInit(): void {
    this.route.url === '/test' ? this.showRoute = true :null;

  }
  ngAfterViewInit() {

    this.route.url === '/test' ? this.showRoute = true :null;

  }
}

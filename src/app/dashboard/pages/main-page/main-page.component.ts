import { Component, OnInit, Query, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { Viaje } from '../../model/viaje';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  selected: string = ''; // Iniciamos
  verSelected: string = '';
  register: boolean = false;
  travels: boolean = false;
  history: boolean = false;
  list: boolean = false;


  capturar() {
    this.verSelected = this.selected;
  }

  constructor(private observer: BreakpointObserver, private http: HttpClient) {}

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  ngOnInit(): void {}

  registro(): void {
    this.list = false;
    this.history = false;
    this.travels = false;
    this.register = true;
  }
  viajes(): void {
    this.selected = 'viajesActivos';

    this.list = false;
    this.register = false;
    this.history = false;
    this.travels = true;
  }
  listas(): void {
    this.register = false;
    this.history = false;
    this.travels = false;
    this.list = true;
  }
  historial(): void {
    this.list = false;
    this.register = false;
    this.travels = false;
    this.history = true;
  }
}

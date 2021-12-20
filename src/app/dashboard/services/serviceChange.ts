import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { modificarViaje } from '../model/modificarViaje';

@Injectable({
  providedIn: 'root',
})
export class serviceChange {
  constructor(private http: HttpClient) {}

  changeStatus(v: modificarViaje): Observable<modificarViaje> {
    return this.http.post<modificarViaje>(
      'api/Travel?travelID=' +
        v.travelID +
        '&statusTravel=' +
        v.statusTravel +
        '&userOperation=' +
        v.userOperation +
        '&cadeteID=' +
        v.cadeteID +
        '&isReasigned=' +
        v.isReasigned,
      v
    );
  }

  ngOnInit() {}
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class requestService {
  constructor(private http: HttpClient) {}

  solicitar(newUser: user): Observable<user> {
    console.log(newUser);
    return this.http.post<user>('api/Users', newUser);
  }
}

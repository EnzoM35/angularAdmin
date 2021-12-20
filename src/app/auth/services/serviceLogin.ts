import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userLog } from '../model/userLog.model';

@Injectable({
  providedIn: 'root',
})
export class loginService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<userLog> {
    return this.http.get<userLog>(
      `/api/Login?email=${email}&password=${password}`
    );
  }
}

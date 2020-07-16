import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  constructor(private http: HttpClient) {}

  getLocation(): Observable<any> {
    return this.http.get<any>('assets/catalog.json');
  }
}

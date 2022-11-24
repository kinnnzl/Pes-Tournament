import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  private endpoint = 'http://localhost:3000/api/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) { }

  private extractData(res: any) {
    const body = res;
    return body || {};
  }

  getMenus(): Observable<any> {
    return this.http.get(this.endpoint + 'mtnMenu').pipe(map(this.extractData));
  }

  getMenuItems(): Observable<any> {
    return this.http.get(this.endpoint + 'mtnMenu/mtnMenuItem').pipe(map(this.extractData));
  } 
}

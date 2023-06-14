import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  private endpoint = 'http://localhost:3000/api/master/';
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

  createLeague(leagueObj: any): Observable<any> {
    //pass it if you can't modify web api
    return this.http.post(this.endpoint + 'createLeague', JSON.stringify({ leagueObj }), this.httpOptions).pipe(map(this.extractData));
  }

  updateLeague(leagueObj: any): Observable<any> {
    return this.http.post(this.endpoint + 'updateLeague', JSON.stringify({ leagueObj }), this.httpOptions).pipe(map(this.extractData));
  }

  getLeagues(LeagueID: any): Observable<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const params = new HttpParams().append('LeagueID', LeagueID);
    return this.http.get(this.endpoint + 'getLeagues', { headers, params }).pipe(map(this.extractData));
  }
}

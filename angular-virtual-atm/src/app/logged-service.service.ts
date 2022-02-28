import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseApiUrl } from 'src/environments/environment';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoggedServiceService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('message')}`
    }),
    withCredentials: true 
  }

  getBalance(): Observable<any> {
    return this.http.get(baseApiUrl + '/balance', this.httpOptions);
  }

  withdrawBalance(data: any): Observable<any> {
    return this.http.patch(baseApiUrl + '/withdrawal', JSON.stringify(data), this.httpOptions);
  }

  depositBalance(data: any): Observable<any> {
    return this.http.patch(baseApiUrl + '/deposit', JSON.stringify(data), this.httpOptions);
  }

  changePin(data: any): Observable<any> {
    return this.http.patch(baseApiUrl + '/changepin', JSON.stringify(data), this.httpOptions);
  }

  transferBalance(data: any): Observable<any> {
    return this.http.patch(baseApiUrl + '/transfer', JSON.stringify(data), this.httpOptions);
  }

  getAccounts(): Observable<any> {
    return this.http.get(baseApiUrl + '/accounts', this.httpOptions);
  }

  autoLogout(expirationDate: number) {
    setTimeout(() => {
      this.logout();
    }, expirationDate);
  }

  logout() {
    sessionStorage.removeItem('isadmin');
    sessionStorage.removeItem('message');
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseApiUrl } from 'src/environments/environment';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true 
  }

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(baseApiUrl + '/login', JSON.stringify(data), this.httpOptions);
  }

  setToken(data: string) {
    sessionStorage.setItem('message', data);
  }

  loggedIn() {
    return !!sessionStorage.getItem('message');
  }

  setAdmin(isadmin: string) {
    sessionStorage.setItem('isadmin', isadmin);
  }

}

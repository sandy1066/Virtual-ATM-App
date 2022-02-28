import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { baseApiUrl } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-virtual-atm';

  constructor(private http: HttpClient) {}
}

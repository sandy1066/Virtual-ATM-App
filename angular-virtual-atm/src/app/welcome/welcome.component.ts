import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedServiceService } from '../logged-service.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private loggedService: LoggedServiceService, private router: Router) {
    this.isadmin = JSON.parse(sessionStorage.getItem('isadmin') || '');
   }

  isadmin = false;
  ngOnInit(): void {
    this.loggedService.autoLogout(150000);
    
  }

  logoutProcess() {
    this.loggedService.logout();
    this.router.navigateByUrl('cancel');
  }

}

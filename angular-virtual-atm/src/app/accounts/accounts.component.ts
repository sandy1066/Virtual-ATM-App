import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedServiceService } from '../logged-service.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  constructor(private loggedService: LoggedServiceService, private router: Router) { }

  users: any = []

  ngOnInit(): void {
    this.loggedService.getAccounts().subscribe(result => {
      this.users = result.message
    })
  }

  logoutProcess() {
    this.loggedService.logout();
    this.router.navigateByUrl('cancel');
  }

}

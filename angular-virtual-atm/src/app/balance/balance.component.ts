import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedServiceService } from '../logged-service.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  constructor(private loggedService: LoggedServiceService, private router: Router) { }

  balance: number;

  ngOnInit(): void {
    this.loggedService.getBalance().subscribe(result => {
      this.balance = result.message
    })
  }

  logoutProcess() {
    this.loggedService.logout();
    this.router.navigateByUrl('cancel');
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggedServiceService } from '../logged-service.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private loggedService: LoggedServiceService, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      balance: new FormControl('', [Validators.required])
    });
  }

  submitted = false;

  message: string;
  balance: number;

  depositProcess() {
    this.submitted = true;
    if(this.formGroup.valid) {
      this.loggedService.depositBalance(this.formGroup.value).subscribe(result => {
        this.message = result.message
        this.balance = result.balance
      })
    }
  }

  logoutProcess() {
    this.loggedService.logout();
    this.router.navigateByUrl('cancel');
  }
}
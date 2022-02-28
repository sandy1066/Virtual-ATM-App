import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggedServiceService } from '../logged-service.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private loggedService: LoggedServiceService, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      account_number: new FormControl('', [Validators.required, Validators.minLength(8)]),
      ifsc_code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      amount_to_transfer: new FormControl('', [Validators.required])
    });
  }

  submitted = false;

  message: string;
  balance: number;
  
  transferProcess() {
    this.submitted = true;
    if(this.formGroup.valid) {
      this.loggedService.transferBalance(this.formGroup.value).subscribe(result => {
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

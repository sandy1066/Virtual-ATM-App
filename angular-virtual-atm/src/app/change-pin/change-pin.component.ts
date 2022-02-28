import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggedServiceService } from '../logged-service.service';

@Component({
  selector: 'app-change-pin',
  templateUrl: './change-pin.component.html',
  styleUrls: ['./change-pin.component.css']
})
export class ChangePinComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private loggedService: LoggedServiceService, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      pin_code: new FormControl('', [Validators.required, Validators.minLength(4)]),
      new_pin: new FormControl('', [Validators.required, Validators.minLength(4)]),
      re_enter_new_pin: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  submitted = false;

  message: string;
  
  ChangePinProcess() {
    this.submitted = true;
    if(this.formGroup.valid) {
      this.loggedService.changePin(this.formGroup.value).subscribe(result => {
        this.message = result.message
      })
    }
  }

  logoutProcess() {
    this.loggedService.logout();
    this.router.navigateByUrl('cancel');
  }
}

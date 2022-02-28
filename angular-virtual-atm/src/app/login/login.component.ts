import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      card_number: new FormControl('', [Validators.required, Validators.minLength(8)]),
      pin_code: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  // get f(){
  //   return this.formGroup.controls;
  // }

  loginProcess() {
    if(this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe(result => {
          this.authService.setToken(result.message);
          this.authService.setAdmin(result.isadmin);
          this.router.navigateByUrl('welcome');
      });
    }
  }

}

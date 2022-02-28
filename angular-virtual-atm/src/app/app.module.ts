import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { TransferComponent } from './transfer/transfer.component';
import { ChangePinComponent } from './change-pin/change-pin.component';
import { CancelComponent } from './cancel/cancel.component';
import { HomeComponent } from './home/home.component';
import { DepositComponent } from './deposit/deposit.component';
import { BalanceComponent } from './balance/balance.component';
import { AuthGuard } from './auth.guard';
import { AuthServiceService } from './auth-service.service';
import { LoggedServiceService } from './logged-service.service';
import { AccountsComponent } from './accounts/accounts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    WithdrawalComponent,
    TransferComponent,
    ChangePinComponent,
    CancelComponent,
    HomeComponent,
    DepositComponent,
    BalanceComponent,
    AccountsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers: [AuthServiceService, LoggedServiceService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

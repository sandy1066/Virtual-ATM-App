import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { AuthGuard } from './auth.guard';
import { BalanceComponent } from './balance/balance.component';
import { CancelComponent } from './cancel/cancel.component';
import { ChangePinComponent } from './change-pin/change-pin.component';
import { DepositComponent } from './deposit/deposit.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TransferComponent } from './transfer/transfer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'login', component: LoginComponent },
  { path:'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },
  { path:'balance', component: BalanceComponent, canActivate: [AuthGuard] },
  { path:'withdrawal', component: WithdrawalComponent, canActivate: [AuthGuard] },
  { path:'changePin', component: ChangePinComponent, canActivate: [AuthGuard] },
  { path:'transfer', component: TransferComponent, canActivate: [AuthGuard] },
  { path:'deposit', component: DepositComponent, canActivate: [AuthGuard] },
  { path:'cancel', component: CancelComponent },
  { path:'accounts', component: AccountsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

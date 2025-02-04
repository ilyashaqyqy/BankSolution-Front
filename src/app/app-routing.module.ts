// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard'; 
import { TransactionComponent } from './components/transaction/transaction.component';
import { BeneficiariesComponent } from './components/beneficiaries/beneficiaries.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Protect with AuthGuard
  { path: 'transaction/:accountId', component: TransactionComponent, canActivate: [AuthGuard] },
  { path: 'beneficiaries', component: BeneficiariesComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
  
  // { path: '**', redirectTo: '/login' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

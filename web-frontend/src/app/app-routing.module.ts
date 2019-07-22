import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { SuccessComponent } from './login/success/success.component';
import { FailedComponent } from './login/failed/failed.component';
import { TopComponent } from './top/top.component';
import { DescriptionComponent } from './description/description.component';

const routes: Routes = [
  { path: '', component: DescriptionComponent },
  { path: 'top', component: TopComponent },
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'login/Success', component: SuccessComponent },
  { path: 'login/Failed', component: FailedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { AuthorizatedGuard } from './authentication/service/auth.guard'
import { ControlComponent } from './page/control/control.component';
import { GraphsComponent } from './page/graphs/graphs.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthorizatedGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'control', component: ControlComponent },
  { path: 'graphs', component: GraphsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

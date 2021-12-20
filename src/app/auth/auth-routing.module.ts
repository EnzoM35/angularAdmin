import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginOKGuard } from '../shared/loginOKGuard/logged.guard';
import { AuthComponent } from './auth.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [AuthLoginOKGuard],
    children: [{ path: 'login', component: LoginPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

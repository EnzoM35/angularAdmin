import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../shared/loginGuard/login.guard';
import { DashboardComponent } from './dashboard.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardGuard],
    children: [{ path: 'home', component: MainPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

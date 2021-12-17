import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { ComponentsAuthModule } from '../components/components-auth.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, ComponentsAuthModule, RouterModule],
  exports: [LoginPageComponent],
})
export class PagesAuthModule {}

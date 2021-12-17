import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { MaterialModule } from '../../material.module';
import { ComponentsDashModule } from '../components/components-dash.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, MaterialModule, ComponentsDashModule],
  exports: [MainPageComponent],
})
export class PagesDashModule {}

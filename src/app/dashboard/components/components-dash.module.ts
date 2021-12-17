import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { TableActiveComponent } from './table-active/table-active.component';
import { TablePendingComponent } from './table-pending/table-pending.component';
import { TableCourseComponent } from './table-course/table-course.component';
import { TableHistoryComponent } from './table-history/table-history.component';

@NgModule({
  declarations: [
    TableActiveComponent,
    TablePendingComponent,
    TableCourseComponent,
    TableHistoryComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    TableActiveComponent,
    TablePendingComponent,
    TableCourseComponent,
    TableHistoryComponent,
  ],
})
export class ComponentsDashModule {}

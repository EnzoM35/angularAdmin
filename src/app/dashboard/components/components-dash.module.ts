import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { TableActiveComponent } from './table-active/table-active.component';
import { TablePendingComponent } from './table-pending/table-pending.component';
import { TableCourseComponent } from './table-course/table-course.component';
import { TableHistoryComponent } from './table-history/table-history.component';
import { FormRegisterComponent } from './form-register/form-register.component';
import { TableListUsersComponent } from './table-list-users/table-list-users.component';
import { TableListAdminsComponent } from './table-list-admins/table-list-admins.component';
import { TableListCadetsComponent } from './table-list-cadets/table-list-cadets.component';
import { TableListAllComponent } from './table-list-all/table-list-all.component';
import { DialogFormComponent } from './dialog-form/dialog-form.component';

@NgModule({
  declarations: [
    TableActiveComponent,
    TablePendingComponent,
    TableCourseComponent,
    TableHistoryComponent,
    FormRegisterComponent,
    TableListUsersComponent,
    TableListAdminsComponent,
    TableListCadetsComponent,
    TableListAllComponent,
    DialogFormComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    TableActiveComponent,
    TablePendingComponent,
    TableCourseComponent,
    TableHistoryComponent,
    FormRegisterComponent,
    TableListAdminsComponent,
    TableListUsersComponent,
    TableListCadetsComponent,
    TableListAllComponent
  ],
})
export class ComponentsDashModule {}

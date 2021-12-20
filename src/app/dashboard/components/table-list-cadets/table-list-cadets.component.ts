import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { user } from '../../model/user';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { requestService } from '../../services/register';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table-list-cadets',
  templateUrl: './table-list-cadets.component.html',
  styleUrls: ['./table-list-cadets.component.scss'],
})
export class TableListCadetsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: any;
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  displayedColumns: string[] = [
    'name',
    'direccion',
    'telefono',
    'email',
    'vehiculo',
    'elimMod',
  ];

  dataSource: MatTableDataSource<user>;
  users: user[];
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private serviceregister: requestService,
    private snackBar: MatSnackBar
  ) {
    this.getUsers();
  }

  //REQUEST VIAJES DISPONIBLES

  getUsers() {
    let admins = this.http.get<user[]>(`/api/Users?userOperation=1`);

    admins.subscribe((resp) => {
      this.users = resp;
      this.users = this.users.filter((item) => {
        if (item.rol?.id) {
          return item.rol?.id === 2;
        }
        return false;
      });
      console.clear();
      this.dataSource = new MatTableDataSource<user>(this.users);
      this.dataSource.paginator = this.paginator;
      this.loading = true;
    });
  }

  applyFilter(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Modificar usuario
  show(item: user): void {
    this.dialog.open(DialogFormComponent, {
      data: item,
      width: '400px',
    });
    this.dialog.afterAllClosed.subscribe((resp) => {
      this.getUsers();
    });
  }

  deleteUser(item: user): void {
    item.isDeleted = true;
    item.isAccepted = false;

    this.serviceregister.solicitar(item).subscribe((resp) => {
      this.snackBar.open('Usuario Eliminado', '', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }

  ngOnInit(): void {}
}

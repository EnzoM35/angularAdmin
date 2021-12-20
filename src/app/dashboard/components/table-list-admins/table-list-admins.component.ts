import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { user } from '../../model/user';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-table-list-admins',
  templateUrl: './table-list-admins.component.html',
  styleUrls: ['./table-list-admins.component.scss'],
})
export class TableListAdminsComponent implements OnInit {
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

  displayedColumns: string[] = ['name', 'direccion', 'telefono', 'email'];

  dataSource: MatTableDataSource<user>;
  users: user[];
  loading: boolean = false;

  constructor(private http: HttpClient) {
    this.getUsers();
  }

  //REQUEST VIAJES DISPONIBLES

  getUsers() {
    let admins = this.http.get<user[]>(`/api/Users?userOperation=1`);

    admins.subscribe((resp) => {
      this.users = resp;
      this.users = this.users.filter((item) => {
        if (item.rol?.id) {
          return item.rol?.id === 1;
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

  ngOnInit(): void {}
}

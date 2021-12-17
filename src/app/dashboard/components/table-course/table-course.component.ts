import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Viaje } from '../../model/viaje';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-table-course',
  templateUrl: './table-course.component.html',
  styleUrls: ['./table-course.component.scss'],
})
export class TableCourseComponent implements OnInit {
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

  displayedColumns: string[] = ['cliente', 'direccion', 'estado'];

  dataSource: MatTableDataSource<Viaje>;

  viajesActivos: Viaje[];
  loading: boolean = false;

  constructor(private http: HttpClient) {
    this.viajesDisponibles();
  }

  //REQUEST VIAJES DISPONIBLES
  viajesDisponibles() {
    let status2 = this.http.get<Viaje[]>('/api/Travel/1/2');
    let status3 = this.http.get<Viaje[]>('/api/Travel/1/3');
    let status6 = this.http.get<Viaje[]>('/api/Travel/1/6');
    let status7 = this.http.get<Viaje[]>('/api/Travel/1/7');

    +forkJoin([status2, status3, status6, status7]).subscribe((results) => {
      this.viajesActivos = [
        ...results[0],
        ...results[1],
        ...results[2],
        ...results[3],
      ];

      this.viajesActivos.sort(function (a, b) {
        return (
          Date.parse(
            a.travelEquipmentDTOs[a.travelEquipmentDTOs.length - 1]
              .operationDate
          ) -
          Date.parse(
            b.travelEquipmentDTOs[b.travelEquipmentDTOs.length - 1]
              .operationDate
          )
        );
      });
      console.clear();
      this.dataSource = new MatTableDataSource<Viaje>(this.viajesActivos);
      this.dataSource.paginator = this.paginator;
      this.loading = true;
    });
  }

  estadoMap: any = {
    '2': 'Asignado al cadete',
    '3': 'En viaje al laboratorio',
    '6': 'Asignado al cadete',
    '7': 'En viaje al cliente',
    other: '-',
  };

  applyFilter(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {}
}

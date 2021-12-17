import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Viaje } from '../../model/viaje';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-table-active',
  templateUrl: './table-active.component.html',
  styleUrls: ['./table-active.component.scss'],
})
export class TableActiveComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  @ViewChild(MatSort) sort: any;

  displayedColumns: string[] = ['cliente', 'direccion', 'estado'];

  dataSource: MatTableDataSource<Viaje>;

  viajesActivos: Viaje[];
  loading: boolean = false;

  constructor(private http: HttpClient) {
    this.viajesDisponibles();
  }

  //REQUEST VIAJES DISPONIBLES
  viajesDisponibles() {
    let status1 = this.http.get<Viaje[]>('/api/Travel/1/1');
    let status2 = this.http.get<Viaje[]>('/api/Travel/1/2');
    let status3 = this.http.get<Viaje[]>('/api/Travel/1/3');
    let status4 = this.http.get<Viaje[]>('/api/Travel/1/4');
    let status5 = this.http.get<Viaje[]>('/api/Travel/1/5');
    let status6 = this.http.get<Viaje[]>('/api/Travel/1/6');
    let status7 = this.http.get<Viaje[]>('/api/Travel/1/7');
    let status8 = this.http.get<Viaje[]>('/api/Travel/1/8');

    +forkJoin([
      status1,
      status2,
      status3,
      status4,
      status5,
      status6,
      status7,
      status8,
    ]).subscribe((results) => {
      this.viajesActivos = [
        ...results[0],
        ...results[1],
        ...results[2],
        ...results[3],
        ...results[4],
        ...results[5],
        ...results[6],
        ...results[7],
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
    '1': 'Solicitud de retiro cliente',
    '2': 'Asignado al cadete',
    '3': 'En viaje al laboratorio',
    '4': 'Pendiente de reparación',
    '5': 'Reparado',
    '6': 'Asignado al cadete',
    '7': 'En viaje al cliente',
    '8': 'Entregado al cliente',
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

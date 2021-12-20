import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Viaje } from '../../model/viaje';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-table-history',
  templateUrl: './table-history.component.html',
  styleUrls: ['./table-history.component.scss'],
})
export class TableHistoryComponent implements OnInit {
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

  displayedColumns: string[] = ['cadete', 'cliente', 'fecha', 'estado'];

  dataSource: MatTableDataSource<Viaje>;

  viajesActivos: Viaje[];
  loading: boolean = false;

  constructor(private http: HttpClient) {
    this.viajesDisponibles();
  }

  //REQUEST VIAJES DISPONIBLES
  viajesDisponibles() {
    let status9 = this.http.get<Viaje[]>('/api/Travel/1/9');

    +forkJoin([status9]).subscribe((results) => {
      this.viajesActivos = [...results[0]];

      this.viajesActivos.sort(function (a, b) {
        return (
          Date.parse(
            b.travelEquipmentDTOs[b.travelEquipmentDTOs.length - 1]
              .operationDate
          ) -
          Date.parse(
            a.travelEquipmentDTOs[a.travelEquipmentDTOs.length - 1]
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
    '9': 'Entregado conforme',
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

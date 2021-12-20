import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Viaje } from '../../model/viaje';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { modificarViaje } from '../../model/modificarViaje';
import { serviceChange } from '../../services/serviceChange';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-table-pending',
  templateUrl: './table-pending.component.html',
  styleUrls: ['./table-pending.component.scss'],
})
export class TablePendingComponent implements OnInit {
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
  arrayEstados: string[] = [
    'Solicitud de retiro cliente',
    'Asignado al cadete para lab.',
    'En viaje al laboratorio',
    'Pendiente de reparación',
    'Reparado',
    'Asignado al cadete para cliente.',
    'En viaje al cliente',
    'Entregado al cliente',
    'Entregado conforme',
  ];
  viajesActivos: Viaje[];
  loading: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private servicechange: serviceChange
  ) {
    this.viajesDisponibles();
  }

  //REQUEST VIAJES DISPONIBLES
  viajesDisponibles() {
    let status1 = this.http.get<Viaje[]>('/api/Travel/1/1');
    let status5 = this.http.get<Viaje[]>('/api/Travel/1/5');

    +forkJoin([status1, status5]).subscribe((results) => {
      this.viajesActivos = [...results[0], ...results[1]];

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
    '5': 'Reparado',

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
  change(item: Viaje) {
    let status: number = item.lastStatusTravel;
    let userO: number = 1;
    let idCadete: number = 53;
    console.log(item);
    let asignar: modificarViaje = {
      travelID: item.id,
      statusTravel: status,
      userOperation: userO,
      cadeteID: idCadete,
      isReasigned: true,
    };
    console.log(asignar);

    this.servicechange.changeStatus(asignar).subscribe(
      (resp) => {
        this.snackBar.open('Estado reasignado con éxito!', '', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.viajesDisponibles();
      },
      (error) => {
        this.snackBar.open('Error 404', '', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { rol } from '../../model/rol';
import { user } from '../../model/user';
import { HttpClient } from '@angular/common/http';
import { requestService } from '../../services/register';
import {
  FormControl,
  FormGroup,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { vehicle } from '../../model/vehicle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Viaje } from '../../model/viaje';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss'],
})
export class DialogFormComponent implements OnInit {
  cadete: boolean = true;
  selected: string = '';
  constructor(
    public dialogRef: MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: user,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private serviceregister: requestService,
    private cdRef: ChangeDetectorRef
  ) {}
  nombre: string;
  mail: string;
  password: string;
  direccion: string;
  telefono: string;

  rol: rol;
  arrayRoles: rol[];
  veh: vehicle;
  arrayVeh: vehicle[];

  ngOnInit(): void {
    this.nombre = this.data.fullName;
    this.mail = this.data.email;
    this.password = this.data.password;
    this.direccion = this.data.address;
    this.telefono = this.data.cellPhone;
    if (this.data.vehicle?.name) {
      this.selected = this.data.vehicle?.name;
    }

    this.cadete = false;
    let vehiculos = this.http.get<vehicle>('/api/Vehicles');
    let roles = this.http.get<rol>('/api/Roles');
    roles.subscribe((resp) => {
      this.rol = resp;
      this.arrayRoles = Object.values(this.rol);
      this.arrayRoles.shift();
    });
    vehiculos.subscribe((resp) => {
      this.veh = resp;
      this.arrayVeh = Object.values(this.veh);
    });
  }

  //FORMULARIO
  reqForm = new FormGroup({
    id: new FormControl(this.data.id),
    rol: new FormControl('', Validators.required),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    cellPhone: new FormControl('', Validators.required),
    vehicle: new FormControl(''),
    isAccepted: new FormControl(true),
    isDeleted: new FormControl(false),
  });

  usuario: user = {
    id: this.data.id,
    email: '',
    fullName: '',
    address: '',
    cellPhone: '',
    isAccepted: true,
    isDeleted: false,
    observations: '',
    password: '',
    vehicle: undefined,
    rol: undefined,
  };

  submit(formDirective: FormGroupDirective): void {
    if (this.reqForm.value.rol.id === 3) {
      this.reqForm.value.vehicle = null;
      this.serviceregister.solicitar(this.reqForm.value).subscribe((resp) => {
        this.snackBar.open('Usuario modificado con éxito', '', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      });
    } else {
      this.snackBar.open('Error 403', '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }

    formDirective.resetForm();
    this.reqForm.reset();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  isCadete(item: string) {
    if (item === 'Cadete') {
      this.cadete = true;
    } else {
      this.cadete = false;
    }
  }

  ngAfterViewChecked() {
    this.cadete;
    this.cdRef.detectChanges();
  }
}

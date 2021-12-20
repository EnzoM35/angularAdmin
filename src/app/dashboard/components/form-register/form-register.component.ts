import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss'],
})
export class FormRegisterComponent implements OnInit {
  cadete: boolean = true;
  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private serviceregister: requestService
  ) {}
  rol: rol;
  arrayRoles: rol[];
  veh: vehicle;
  arrayVeh: vehicle[];

  ngOnInit(): void {
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
      this.reqForm.value.vehicle = '';
      this.serviceregister.solicitar(this.reqForm.value).subscribe((resp) => {
      this.snackBar.open('Usuario registrado con éxito', '', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
    } else {
      this.serviceregister.solicitar(this.reqForm.value).subscribe((resp) => {
      this.snackBar.open('error', '', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
    }


    formDirective.resetForm();
    this.reqForm.reset();
  }

  isCadete(item: string) {
    if (item === 'Cadete') {
      this.cadete = true;
    } else {
      this.cadete = false;
    }
  }
}

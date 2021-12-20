import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { userLog } from '../../model/userLog.model';
import { loginService } from '../../services/serviceLogin';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: loginService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  hide = true;

  ngOnInit(): void {}
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  user: userLog = {
    email: '',
    password: '',
    rol: {
      id: -1,
    },
  };

  submit(formDirective: FormGroupDirective): void {
    this.login();
    formDirective.resetForm();
    this.loginForm.reset();
  }

  //redirección a home de cadetes
  isTravelsRoute() {
    return this.router.navigate(['dashboard/home']);
  }

  //Diálogo para datos erróneos
  /*openDialog(mensaje: string) {
    this.dialog.open(DialogComponent, {
      data: mensaje,
      width: '350px',
    });
  }*/

  login(): void {
    //LOGIN
    this.user = this.loginForm.value;

    this.loginService.login(this.user.email, this.user.password).subscribe(
      (resp) => {
        if (resp.rol.id === 1) {
          console.log(resp);
          localStorage.setItem('id', JSON.stringify(resp.id));
          localStorage.setItem('rolID', JSON.stringify(resp.rol.id));
          localStorage.setItem('name', JSON.stringify(resp.fullName));
          this._snackBar.open('Usuario logeado!', '', {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.isTravelsRoute();
        } else {
          this._snackBar.open(
            'Estás intentando acceder desde una cuenta que no es de Admin',
            '',
            {
              duration: 4000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
        }
      },
      (error) => {
        this._snackBar.open(
          'Datos érroneos, usuario o contraseña inválidos.',
          '',
          {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          }
        );
      }
    );
  }
}

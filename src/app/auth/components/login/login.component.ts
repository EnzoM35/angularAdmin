import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
//import { userLog } from '../../model/userLog.model';
//import { loginService } from '../../services/serviceLogin';
import { Router } from '@angular/router';
//import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    //private loginService: loginService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  hide = true;

  ngOnInit(): void {}
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  /*  user: userLog = {
    email: '',
    password: '',
    rol: {
      id: -1,
    },
  };*/

  submit(formDirective: FormGroupDirective): void {
    // this.login();
    formDirective.resetForm();
    this.loginForm.reset();
  }

  //redirección a home de cadetes
  isTravelsRoute() {
    return this.router.navigate(['dashboard/travels']);
  }

  //Diálogo para datos erróneos
  /*openDialog(mensaje: string) {
    this.dialog.open(DialogComponent, {
      data: mensaje,
      width: '350px',
    });
  }*/

  /* login(): void {
    //LOGIN
    this.user = this.loginForm.value;

    this.loginService.login(this.user.email, this.user.password).subscribe(
      (resp) => {
        if (resp.rol.id === 2) {
          localStorage.setItem('id', JSON.stringify(resp.id));
          localStorage.setItem('rolID', JSON.stringify(resp.rol.id));
          console.log('Logeado con éxtito');
          this.isTravelsRoute();
        } else {
          this.openDialog(
            'Estás intentando acceder desde una cuenta que no es de Cadete'
          );
        }
      },
      (error) => {
        this.openDialog('Datos érroneos, usuario o contraseña inválidos.');
      }
    );
  }*/
}

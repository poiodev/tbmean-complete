import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.loginData = {};
  }

  ngOnInit(): void {}

  login() {
    if (!this.loginData.email || !this.loginData.password) {
      this.message = 'Failed process: Imcomplete data';
      this.openSnackBarError();
      this.loginData = {};
    } else {
      this._userService.login(this.loginData).subscribe({
        next: (v) => {
          localStorage.setItem('token', v.token);
          this._router.navigate(['/listTask']);
          this.getRole(this.loginData.email);
          this.loginData = {};
        },
        error: (e) => {
          this.message = e.error.message;
          this.openSnackBarError();
        },
        complete: () => console.info('complete'),
      });
    }
  }

  getRole(email: string) {
    this._userService.getRole(email).subscribe({
      next: (v) => {
        localStorage.setItem('role', v.userRole);
      },
      error: (e) => {
        this.message = e.error.message;
        this.openSnackBarError();
      },
      complete: () => console.info('complete'),
    });
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    });
  }
}

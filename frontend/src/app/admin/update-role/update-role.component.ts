import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css'],
})
export class UpdateRoleComponent implements OnInit {
  registerData: any;
  roles: Array<any>;
  message: string = '';
  _id: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _userService: UserService,
    private _roleService: RoleService,
    private _router: Router,
    private _Arouter: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.registerData = {};
    this._id = '';
    this.roles = [];
  }

  ngOnInit(): void {
    this._Arouter.params.subscribe((params) => {
      this._id = params['_id'];
      this._roleService.findRole(this._id).subscribe(
        (res) => {
          this.registerData = res.role;
        },
        (err) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    });
  }

  updateRole() {
    if (!this.registerData.name || !this.registerData.description) {
      this.message = 'Failed process: Imcomplete data';
      this.openSnackBarError();
    } else {
      this._roleService.updateRole(this.registerData).subscribe(
        (res) => {
          this._router.navigate(['/listRole']);
          this.message = 'Successfull edit role';
          this.openSnackBarSuccesfull();
          this.registerData = {};
        },
        (err) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    }
  }

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'],
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

import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent {
  displayedColumns: string[] = ['NAME', 'EMAIL', 'ROLE', 'STATUS', 'ACTIONS'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  userData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.userData = {};
    this.dataSource = new MatTableDataSource(this.userData);
  }

  ngOnInit(): void {
    this._userService.listUser('').subscribe({
      next: (v) => {
        this.userData = v.userList;
        this.dataSource = new MatTableDataSource(this.userData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (e) => {
        this.message = e.error.message;
        this.openSnackBarError();
      },
      complete: () => console.info('complete'),
    });
  }

  deleteUser(user: any) {
    this._userService.deleteUser(user).subscribe({
      next: (v) => {
        let index = this.userData.indexOf(user);
        if (index > -1) {
          this.userData.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.userData);
          this.message = 'Delete user';
          this.openSnackBarSuccesfull();
        }
      },
      error: (e) => {
        this.message = e.error.message;
        this.openSnackBarError();
      },
      complete: () => console.info('complete'),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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

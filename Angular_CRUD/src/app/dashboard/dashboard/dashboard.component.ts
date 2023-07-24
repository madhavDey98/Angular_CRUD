import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { RequestMapper } from 'src/app/request-mapper';
import { ServiceService } from 'src/app/services/service.service';
import { VariableConstants } from 'src/app/varibale-constants';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { Router } from '@angular/router';
import { BmxToastService } from 'bmx-toast';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  ELEMENT_DATA: any;
  dataSource: any;

  constructor(
    private userData: ServiceService,
    public dialog: MatDialog,
    private router: Router,
    public _toastService: BmxToastService
  ) {}

  ngOnInit(): void {
    this.getEmployee();
  }

  displayedColumns: string[] = ['id', 'fname', 'lname', 'email', 'action'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getEmployee() {
    this.userData
      .callApiData(
        {},
        VariableConstants.METHOD_GET,
        RequestMapper.API_EMP_LIST,
        VariableConstants.ACCESS_PRIVATE
      )
      .subscribe({
        next: (result) => {
          console.log(result);
          this.ELEMENT_DATA = result;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          console.log(this.dataSource);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onAddEmployee() {
    debugger;
    const dialogRef = this.dialog.open(AddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.getEmployee();
        }
      },
      error: (err) => {},
    });
  }

  deleteEmp(id: number) {
    console.log(id);
    this.userData.deleteEmployee(id).subscribe({
      next: (res) => {
        console.log(res);

        this._toastService.generate({
          type: 'success', //<-- mandatory key
          toastHeading: 'Deleted', //<-- mandatory key
          toastText: 'Employer Deleted Succesfully', //<-- mandatory key
          timeout: 3000, //<-- non-mandatory key
          position: 'top-right', //<-- non-mandatory key
          autoClose: true, //<-- non-mandatory key
          progressbar: true, //<-- non-mandatory key
        });
        this.getEmployee();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  logOut() {
    this._toastService.generate({
      type: 'success', //<-- mandatory key
      toastHeading: 'Logged Out', //<-- mandatory key
      toastText: 'Logged Out Succesfully', //<-- mandatory key
      timeout: 3000, //<-- non-mandatory key
      position: 'top-right', //<-- non-mandatory key
      autoClose: true, //<-- non-mandatory key
      progressbar: true, //<-- non-mandatory key
    });
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(AddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.getEmployee();
        }
      },
      error: (err) => {},
    });
  }
}

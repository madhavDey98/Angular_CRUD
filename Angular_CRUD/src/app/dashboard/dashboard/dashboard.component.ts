import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { RequestMapper } from 'src/app/request-mapper';
import { ServiceService } from 'src/app/services/service.service';
import { VariableConstants } from 'src/app/varibale-constants';
import { AddEditComponent } from '../add-edit/add-edit.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  ELEMENT_DATA: any;
  dataSource: any;
  constructor(private userData: ServiceService, public dialog: MatDialog) {}

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
        alert('Employee Deleted Succesfully');
        this.getEmployee();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

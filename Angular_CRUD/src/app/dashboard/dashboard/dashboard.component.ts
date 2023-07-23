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
    this.userData
      .callApi(
        {},
        VariableConstants.METHOD_GET,
        RequestMapper.API_USER_LIST,
        VariableConstants.ACCESS_PRIVATE
      )
      .subscribe((result: any) => {
        console.log(result.data);
        this.ELEMENT_DATA = result.data;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        console.log(this.dataSource);
      });
  }

  displayedColumns: string[] = ['id', 'fname', 'age', 'salary', 'action'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddEmployee() {
    debugger;
    this.dialog.open(AddEditComponent);
  }
}
